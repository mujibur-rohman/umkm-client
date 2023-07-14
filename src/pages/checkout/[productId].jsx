import InputText from "@/components/InputText/InputText";
import Textarea from "@/components/Textarea/Textarea";
import ProductAPI from "@/network/features/product.api";
import TransactionAPI from "@/network/features/transaction.api";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as yup from "yup";

function Checkout({ product }) {
  const router = useRouter();
  const { data: session } = useSession();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      qty: 1,
      price: product.price,
    },
    validationSchema: yup.object({
      name: yup.string().required().trim(),
      address: yup.string().required().trim(),
    }),
    onSubmit: async (val) => {
      try {
        await TransactionAPI.add({
          ...val,
          productId: product.id,
          storeId: product.storeId,
          userId: session.user.id,
        });
        toast.success("Checkout Berhasil");
        router.push("/success-checkout/" + product.storeId);
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[50vw] flex flex-col mx-auto"
    >
      <div className="border-[1px] w-full rounded-lg p-4 mt-10">
        <div className="flex justify-between border-b-2 pb-2">
          <span className="text-lg font-bold">Produk</span>
          <span className="text-lg font-bold">Jumlah</span>
        </div>
        <div className="flex justify-between mt-3 border-b-2 pb-2">
          <span>{product.name}</span>
          <div className="flex justify-between gap-3">
            <span
              className="rounded px-2 cursor-pointer bg-gray-300"
              onClick={() => {
                if (formik.values.qty === 1) {
                  formik.setFieldValue("qty", 1);
                } else {
                  formik.setFieldValue("qty", formik.values.qty - 1);
                  formik.setFieldValue(
                    "price",
                    (formik.values.qty - 1) * product.price
                  );
                }
              }}
            >
              -
            </span>
            <span>{formik.values.qty}</span>
            <span
              onClick={() => {
                formik.setFieldValue("qty", formik.values.qty + 1);
                formik.setFieldValue(
                  "price",
                  (formik.values.qty + 1) * product.price
                );
              }}
              className="rounded px-2 cursor-pointer bg-gray-300"
            >
              +
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-lg font-bold">Total</span>
          <span className="text-lg font-bold text-blue-700">
            Rp. {formik.values.price}
          </span>
        </div>
      </div>
      <div className="border-[1px] w-full flex flex-col gap-3 rounded-lg p-4 mt-3">
        <InputText
          name="name"
          placeholder="Nama"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.errors.name && formik.touched.name}
          errorMessage={formik.touched.name && formik.errors.name}
        />
        <Textarea
          name="address"
          placeholder="Alamat"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.errors.address && formik.touched.address}
          errorMessage={formik.touched.address && formik.errors.address}
        />
      </div>
      <button
        disabled={formik.isSubmitting}
        type="submit"
        className="text-sm mt-4 py-2 bg-primary transition-colors hover:bg-primary-focu text-white rounded-md"
      >
        {formik.isSubmitting ? "Loading" : "Checkout"}
      </button>
    </form>
  );
}

export async function getServerSideProps(context) {
  try {
    const { productId } = context.query;
    const product = await ProductAPI.getOne(productId);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Checkout;
