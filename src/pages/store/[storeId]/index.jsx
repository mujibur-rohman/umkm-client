import Avatar from "@/components/Avatar/avatar";
import InputText from "@/components/InputText/InputText";
import Textarea from "@/components/Textarea/Textarea";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import acceptedImages, { sizeImage } from "@/utils/acceptedImages";
import StoreAPI from "@/network/features/store.api";
import { useRouter } from "next/router";

const EditStore = ({ store }) => {
  const [geo, setGeo] = useState({});
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [srcPic, setSrcPic] = useState("");
  const router = useRouter();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_GOOGLE_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeo({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (store.profilePicture) {
      setSrcPic(store.profilePicture);
    }
  }, []);

  // Form handle
  const formik = useFormik({
    initialValues: {
      profilePicture: store.profilePicture,
      name: store.name,
      address: store.address,
      latitude: store.latitude,
      longitude: store.longitude,
      noTlp: store.noTlp,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().required("nama toko harus diisi").trim(),
      address: yup.string().required("alamat harus diisi").trim(),
      latitude: yup.string().required(),
      longitude: yup.string().required(),
      noTlp: yup
        .string()
        .matches(/^-?\d+\.?\d*$/, "telepon bukan bertipe angka")
        .required("telepon harus diisi")
        .trim(),
    }),
    onSubmit: async (values, formProps) => {
      console.log(values);
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        await StoreAPI.update({
          storeId: store.id,
          formData,
        });

        router.push("/store");
        toast.success("Toko Berhasil Diubah");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  // handler image
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
      formik.setFieldValue("profilePicture", img);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isLoaded) return <p className="text-center">Loading...</p>;

  return (
    <section className="p-10">
      <h2 className="text-center font-medium text-2xl">Ubah Toko</h2>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="mt-6 flex flex-col gap-3"
      >
        <div className="flex justify-center mb-3">
          <Avatar
            changeAble
            size="xl"
            name={"Mujay"}
            src={
              srcPic ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            onChange={changeProfilePic}
          />
        </div>
        <div className="flex gap-3">
          <InputText
            name="name"
            value={formik.values.name}
            placeholder="Nama Toko"
            error={formik.errors.name && formik.touched.name}
            errorMessage={formik.touched.name && formik.errors.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <InputText
            name="noTlp"
            value={formik.values.noTlp}
            placeholder="Nomor Telepon"
            error={formik.errors.noTlp && formik.touched.noTlp}
            errorMessage={formik.touched.noTlp && formik.errors.noTlp}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <Textarea
          placeholder="Alamat Toko"
          name="address"
          value={formik.values.address}
          error={formik.errors.address && formik.touched.address}
          errorMessage={formik.touched.address && formik.errors.address}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div>
          <div
            className={`h-72 my-1 relative w-full rounded overflow-hidden border-[1px]  ${
              formik.errors.latitude ? "border-red-400" : "border-gray-200"
            }`}
          >
            <GoogleMap
              clickableIcons
              onClick={(e) => {
                formik.setFieldValue("latitude", e.latLng.lat());
                formik.setFieldValue("longitude", e.latLng.lng());
              }}
              center={geo}
              zoom={12}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
              onLoad={(map) => {
                setMap(map);
                formik.setFieldValue("latitude", store.latitude * 1);
                formik.setFieldValue("longitude", store.longitude * 1);
              }}
            >
              <MarkerF
                position={{
                  lat: formik.values.latitude * 1 || 0,
                  lng: formik.values.longitude * 1 || 0,
                }}
              />
            </GoogleMap>
            <div
              onClick={() => {
                map.panTo(geo);
              }}
              className="absolute cursor-pointer bottom-2 right-2 bg-white rounded p-1"
            >
              <MapPinIcon className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <span className="text-sm italic text-red-500">
            * klik map untuk memilih lokasi
          </span>
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-primary hover:bg-primary-focus transition-all py-2 text-white rounded"
        >
          {formik.isSubmitting ? "Loading" : "Ubah Toko"}
        </button>
      </form>
    </section>
  );
};

export async function getServerSideProps(context) {
  try {
    const { storeId } = context.query;
    const store = await StoreAPI.getOne(storeId);
    return {
      props: { store },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default EditStore;
