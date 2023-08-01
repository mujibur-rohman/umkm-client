import Avatar from "@/components/Avatar/avatar";
import InputText from "@/components/InputText/InputText";
import Textarea from "@/components/Textarea/Textarea";
import ProductAPI from "@/network/features/product.api";
import acceptedImages, { sizeImage } from "@/utils/acceptedImages";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

function EditProduct({ product }) {
  const [srcPic, setSrcPic] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (product.picture) {
      setSrcPic(product.picture);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      picture: product.picture,
    },
    validationSchema: yup.object({
      name: yup.string().required("nama produk harus diisi").trim(),
      description: yup.string().required("deskripsi harus diisi").trim(),
      picture: yup.string().required("gambar harus diisi"),
      price: yup
        .string()
        .matches(/^-?\d+\.?\d*$/, "harga bukan bertipe angka")
        .required("harga harus diisi")
        .trim(),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        await ProductAPI.update({ formData, productId: product.id });
        router.push("/store");
        toast.success("Produk Berhasil Ditambahkan");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const changeProfilePic = async (e) => {
    try {
      // set blob
      const img = e.target.files[0];
      if (!acceptedImages.includes(img.type)) {
        throw new Error("Gambar yang diupload tidak valid");
      }
      if (img.size > sizeImage) {
        throw new Error("Minimal ukuran gambar 2MB");
      }
      const blob = URL.createObjectURL(img);
      setSrcPic(blob);
      formik.setFieldValue("picture", img);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section className="p-10">
      <h2 className="text-center font-medium text-2xl">Buat Produk</h2>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="mt-6 flex flex-col gap-3"
      >
        <div className="flex flex-col justify-center items-center mb-3">
          <Avatar
            changeAble
            size="xl"
            onChange={changeProfilePic}
            src={
              srcPic ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
          />

          <span className="text-sm text-red-500">{formik.errors.picture}</span>
        </div>
        <div className="flex gap-3">
          <InputText
            name="name"
            value={formik.values.name}
            placeholder="Nama Produk"
            error={formik.errors.name && formik.touched.name}
            errorMessage={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <InputText
            name="price"
            value={formik.values.price}
            placeholder="Harga"
            error={formik.errors.price && formik.touched.price}
            errorMessage={formik.touched.price && formik.errors.price}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <Textarea
          placeholder="Deskripsi"
          value={formik.values.description}
          name="description"
          error={formik.errors.description && formik.touched.description}
          errorMessage={formik.touched.description && formik.errors.description}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        <button
          disabled={formik.isSubmitting}
          type="submit"
          className="bg-primary hover:bg-primary-focus transition-all py-2 text-white rounded"
        >
          {formik.isSubmitting ? "Loading" : "Ubah Produk"}
        </button>
      </form>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const { productId } = context.query;
    const product = await ProductAPI.getOne(productId);
    return {
      props: { product },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default EditProduct;
