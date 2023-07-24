import Avatar from "@/components/Avatar/avatar";
import ProductAPI from "@/network/features/product.api";
import StoreAPI from "@/network/features/store.api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { modals } from "@mantine/modals";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const Store = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const {
    data: store,
    isLoading,
    mutate,
  } = useSWR(`${session.user.store}`, (url) => StoreAPI.getOne(url));

  const openModal = (id) =>
    modals.openConfirmModal({
      title: <p className="font-medium">Hapus Produk</p>,
      children: <p>Apakah yakin ingin menghapus?</p>,
      labels: { confirm: "Ya", cancel: "Batal" },
      onConfirm: async () => {
        try {
          await ProductAPI.delete(id);
          mutate();
          toast.success("Produk Berhasil Dihapus");
        } catch (error) {
          console.log(error);
        }
      },
      withCloseButton: false,
      confirmProps: { type: "primary" },
    });
  const openModalStore = (id) =>
    modals.openConfirmModal({
      title: <p className="font-medium">Hapus Toko</p>,
      children: <p>Apakah yakin ingin menghapus toko?</p>,
      labels: { confirm: "Ya", cancel: "Batal" },
      onConfirm: async () => {
        try {
          await StoreAPI.delete(id);
          router.push("/");
          await update({
            ...session,
            user: {
              ...session?.user,
              store: null,
            },
          });

          toast.success("Toko Berhasil Dihapus");
        } catch (error) {
          console.log(error);
        }
      },
      withCloseButton: false,
      confirmProps: { type: "primary" },
    });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-52" role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
    <section>
      <div className="border-b-[1px] px-10 py-3 flex flex-col items-center gap-2">
        <Avatar name={store?.name} src={store?.profilePicture} size="lg" />
        <div className="flex flex-col items-center">
          <p className="font-medium text-xl">{store?.name}</p>
          <span>{store?.address}</span>
          <div className="flex gap-3">
            <Link
              href={`/store/${store?.id}/edit`}
              className="bg-success px-2 py-1 rounded cursor-pointer text-white mt-3"
            >
              Edit Toko
            </Link>
            <div
              onClick={() => openModalStore(store?.id)}
              className="bg-error px-2 py-1 flex items-center rounded cursor-pointer text-white mt-3"
            >
              <TrashIcon className="w-4 text-white" />
            </div>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
          {store?.Products?.map((prod) => (
            <div key={prod.id} className="border-[1px] rounded overflow-hidden">
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
                  <div className="flex gap-2">
                    <Link
                      href={`product/${prod.id}/edit`}
                      className="bg-warning p-2 rounded cursor-pointer"
                    >
                      <PencilIcon className="w-4 text-white" />
                    </Link>
                    <div
                      onClick={() => openModal(prod.id)}
                      className="bg-error p-2 rounded cursor-pointer"
                    >
                      <TrashIcon className="w-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {store?.Products?.length === 0 && (
          <div className="flex justify-center py-5 font-medium">
            Tidak Ada Produk
          </div>
        )}
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    return {
      props: { session },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default Store;
