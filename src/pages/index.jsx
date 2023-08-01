import { getSession, useSession } from "next-auth/react";
import StoreAPI, { storeEndPoint } from "@/network/features/store.api";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import InputText from "@/components/InputText/InputText";
import ProductAPI, { productEndPoint } from "@/network/features/product.api";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [geo, setGeo] = useState({});
  const { data: store, isLoading: loadingStore } = useSWR(
    `${storeEndPoint}?latitude=${geo.lat}&longitude=${geo.lng}&myStoreId=${
      session?.data?.user?.store || ""
    }`,
    (url) => StoreAPI.getNearly(url)
  );
  const { data: products, isLoading: loadingProducts } = useSWR(
    `${productEndPoint}/all/?search=${search}`,
    (url) => ProductAPI.getAll(url)
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeo({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  // if (loadingProducts) return <p className="text-center m-8">Loading..</p>;

  return (
    <main className="p-5">
      <div className="mb-4 border-[1px] p-5 rounded">
        <div className="flex justify-between items-center">
          <h2
            className={`font-bold text-2xl whitespace-nowrap ${
              search ? "opacity-0" : "opacity-100"
            }`}
          >
            Toko Terdekat
          </h2>
          <div>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari Produk"
            />
          </div>
        </div>
        {search ? null : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 py-3 gap-5">
            {store?.map((item) => (
              <div
                key={item.id}
                className="rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={item.profilePicture}
                  className="w-full"
                  alt="banner"
                />
                <div className="p-3 flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm flex gap-1 text-gray-500">
                    <MapPinIcon className="w-4" />
                    {item?.distance?.toFixed(2)} km
                  </span>
                  <button
                    onClick={() => router.push("store/" + item.id)}
                    className="bg-primary hover:bg-primary-focus px-3 py-1 mt-3 text-sm font-medium rounded text-center text-white"
                  >
                    Kunjungi Toko
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {loadingProducts && <p className="text-center m-8">Loading..</p>}
        <div className="mb-4">
          <h2 className="font-bold text-2xl">Produk</h2>
          <div className="grid grid-cols-4 py-3 gap-5">
            {products?.map((prod) => (
              <div
                key={prod.id}
                className="border-[1px] rounded overflow-hidden"
                onClick={() => router.push("/product/" + prod.id)}
              >
                <div className="cursor-pointer">
                  <img
                    className="w-full h-52 object-cover object-center"
                    src={prod.picture}
                    alt="product"
                  />
                </div>
                <div className="p-2">
                  <p className="text-lg font-medium cursor-pointer">
                    {prod.name}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl mt-2 font-bold text-primary">
                      Rp. {prod.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}
