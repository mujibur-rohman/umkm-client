import Avatar from "@/components/Avatar/avatar";
import StoreAPI from "@/network/features/store.api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Store = ({ store }) => {
  return (
    <section>
      <div className="border-b-[1px] px-10 py-3 flex flex-col items-center gap-2">
        <Avatar name={store.name} src={store.profilePicture} size="lg" />
        <div className="flex flex-col items-center">
          <p className="font-medium text-xl">{store.name}</p>
          <span>{store.address}</span>
          <Link
            href={`/store/${store.id}`}
            className="bg-success px-2 py-1 rounded cursor-pointer text-white mt-3"
          >
            Edit Toko
          </Link>
        </div>
      </div>
      <div className="py-2">
        <div className="flex justify-between items-center px-5">
          <p className="text-2xl font-medium text-center">Produk Saya</p>
          <Link
            href="product/add"
            className="bg-blue-500 px-3 py-2 rounded cursor-pointer text-white mt-3"
          >
            Tambah Produk
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 p-5">
          <div className="border-[1px] rounded overflow-hidden">
            <div className="cursor-pointer">
              <img
                className="w-full h-52 object-cover object-center"
                src="https://cdn.pixabay.com/photo/2016/06/07/17/15/yogurt-1442034_1280.jpg"
                alt="product"
              />
            </div>
            <div className="p-2">
              <p className="text-lg font-medium cursor-pointer">Product Name</p>
              <div className="flex justify-between items-center">
                <p className="text-2xl mt-2 font-bold text-primary">
                  Rp. 20.000
                </p>
                <div className="flex gap-2">
                  <div className="bg-warning p-2 rounded cursor-pointer">
                    <PencilIcon className="w-4 text-white" />
                  </div>
                  <div className="bg-error p-2 rounded cursor-pointer">
                    <TrashIcon className="w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    const store = await StoreAPI.getOne(session.user.store);
    return {
      props: { store },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Store;
