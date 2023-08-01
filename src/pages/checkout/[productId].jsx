import InputText from "@/components/InputText/InputText";
import Textarea from "@/components/Textarea/Textarea";
import ProductAPI from "@/network/features/product.api";
import StoreAPI from "@/network/features/store.api";
import TransactionAPI from "@/network/features/transaction.api";
import haversineDistance from "@/utils/haversineFormula";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

const ONGKIR = 3000;

function Checkout({ product, store }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [geo, setGeo] = useState({});
  const [selectedGeo, setSelectedGeo] = useState({});
  const [distance, setDistance] = useState(0);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_GOOGLE_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeo({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (selectedGeo.lat) {
      const dist = haversineDistance(
        [selectedGeo.lat * 1, selectedGeo.lng * 1],
        [store.latitude, store.longitude]
      );
      setDistance(dist * 1);
      formik.setFieldValue("shipping", Math.round(dist * ONGKIR));
    }
  }, [selectedGeo]);

  // FORM HANDLE
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      qty: 1,
      price: product.price,
      shipping: 0,
    },
    validationSchema: yup.object({
      name: yup.string().required().trim(),
      address: yup.string().required().trim(),
      shipping: yup.number().required().min(1, "Pilih lokasi antar"),
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

  console.log(formik.values.shipping);

  if (!isLoaded) return <p className="text-center">Loading...</p>;

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
        <div>
          <h2 className="text-lg font-medium">Lokasi Antar</h2>
          <div
            className={`h-72 my-1 relative w-full rounded overflow-hidden border-[1px]  ${
              formik.errors.shipping ? "border-red-400" : "border-gray-200"
            }`}
          >
            <GoogleMap
              clickableIcons
              onClick={(e) => {
                setSelectedGeo({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              }}
              center={geo}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
              }}
              onLoad={(map) => {
                setMap(map);
              }}
            >
              <MarkerF
                position={{
                  lat: selectedGeo.lat * 1,
                  lng: selectedGeo.lng * 1,
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
          <span className="text-sm text-red-500">{formik.errors.shipping}</span>
          <div className="flex flex-col gap-1 mt-3 border-t-2 pt-3">
            <div className="flex justify-between">
              <span className="text-sm">Harga</span>
              <span className="text-sm">Rp. {formik.values.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Ongkir</span>
              <span className="text-sm">
                Rp. {formik.values.shipping ? formik.values.shipping : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-blue-700">
                Rp. {formik.values.price + formik.values.shipping}
              </span>
            </div>
          </div>
        </div>
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
    const store = await StoreAPI.getOne(product.storeId);
    return {
      props: {
        product,
        store,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Checkout;
