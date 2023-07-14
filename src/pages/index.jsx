import { getSession, useSession } from "next-auth/react";
import StoreAPI, { storeEndPoint } from "@/network/features/store.api";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const [geo, setGeo] = useState({});
  const { data: store, isLoading } = useSWR(
    `${storeEndPoint}?latitude=${geo.lat}&longitude=${geo.lng}&myStoreId=${session.data.user?.store}`,
    (url) => StoreAPI.getNearly(url)
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setGeo({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  return (
    <main className="p-5">
      <div className="mb-4">
        <h2 className="font-bold text-2xl">Toko Terdekat</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 py-3 gap-5">
          {store?.map((item) => (
            <div key={item.id} className="rounded-xl shadow-md overflow-hidden">
              <img src={item.profilePicture} className="w-full" alt="banner" />
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
      </div>
      <div className="mb-4">
        <h2 className="font-bold text-2xl">Produk Terlaris</h2>
        <div className="grid grid-cols-10 py-3 gap-5">
          {/* {store?.map((item) => (
            <div key={item.id} className="rounded-xl shadow-md overflow-hidden">
              <img src={item.profilePicture} className="w-full" alt="banner" />
              <div className="p-3 flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm flex gap-1 text-gray-500">
                  <MapPinIcon className="w-4" />
                  {item.distance.toFixed(2)} km
                </span>
                <button className="bg-primary hover:bg-primary-focus px-3 py-1 mt-3 text-sm font-medium rounded text-center text-white">
                  Kunjungi Toko
                </button>
              </div>
            </div>
          ))} */}
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
