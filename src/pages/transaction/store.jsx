import TransactionAPI from "@/network/features/transaction.api";
import { statusDelivery, statusPayment } from "@/utils/statusCheck";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Select } from "@mantine/core";
import { modals } from "@mantine/modals";
import { getSession, useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";

function TransactionStore() {
  const session = useSession();
  const {
    data: transaction,
    isLoading,
    mutate,
  } = useSWR(session?.data?.user?.store, (url) =>
    TransactionAPI.getByStore(url)
  );

  const [delivery, setDelivery] = useState(1);

  const openModal = (trx) =>
    modals.open({
      title: <p className="font-medium">Detail Transaksi</p>,
      children: (
        <div>
          <div className="grid grid-cols-2 gap-1">
            <div>
              <p className="font-medium">Nama</p>
              <p>{trx.name}</p>
            </div>
            <div>
              <p className="font-medium">Alamat</p>
              <p>{trx.address}</p>
            </div>
            <div>
              <p className="font-medium">Produk</p>
              <p>{trx.Product.name}</p>
            </div>
            <div>
              <p className="font-medium">Pembeli</p>
              <p>{trx.User.name}</p>
            </div>
            <div>
              <p className="font-medium">Harga Barang</p>
              <p>{trx.price}</p>
            </div>
            <div>
              <p className="font-medium">Jumlah Barang</p>
              <p>{trx.qty}</p>
            </div>
            <div>
              <p className="font-medium">Ongkir</p>
              <p>{trx.shipping}</p>
            </div>
            <div>
              <p className="font-medium">Total Harga</p>
              <p className="text-blue-500 font-medium text-lg">
                Rp. {trx.price * 1 + trx.shipping * 1}
              </p>
            </div>
          </div>
        </div>
      ),
    });

  if (isLoading) return <p className="text-center m-8">Loading..</p>;
  return (
    <section className="p-10">
      <h2 className="text-xl font-bold mb-5">Trsnsaksi Toko</h2>
      {transaction?.length === 0 ? (
        <p className="text-center">Tidak Ada Transaksi</p>
      ) : (
        <div className="relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Produk
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah Bayar
                </th>
                <th scope="col" className="px-6 py-3">
                  Status Pembayaran
                </th>
                <th scope="col" className="px-6 py-3">
                  Status Pengiriman
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((trx) => (
                <tr
                  key={trx.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {trx.Product.name}
                  </th>
                  <td className="px-6 py-4">
                    Rp. {trx.price * 1 + trx.shipping * 1}
                  </td>
                  <td className="px-6 py-4">
                    <Select
                      size="xs"
                      onChange={async (val) => {
                        await TransactionAPI.updateStatus({
                          id: trx.id,
                          statusDelivery: trx.statusDelivery,
                          statusPayment: val,
                        });
                        setDelivery(val);
                        mutate();
                      }}
                      value={trx.statusPayment.toString()}
                      data={[
                        { value: "0", label: "Belum Dibayar" },
                        { value: "1", label: "Sudah Dibayar" },
                      ]}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Select
                      size="xs"
                      onChange={async (val) => {
                        await TransactionAPI.updateStatus({
                          id: trx.id,
                          statusDelivery: val,
                          statusPayment: trx.statusPayment,
                        });
                        setDelivery(val);
                        mutate();
                      }}
                      value={trx.statusDelivery.toString()}
                      data={[
                        { value: "0", label: "Belum Dikirim" },
                        { value: "1", label: "Sedang Dikemas" },
                        { value: "2", label: "Sedang Dikirim" },
                        { value: "3", label: "Sudah Diterima" },
                      ]}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div
                      onClick={() => openModal(trx)}
                      className="p-2 cursor-pointer bg-blue-500 transition-colors hover:bg-blue-600 rounded-md text-white w-fit flex items-center gap-2"
                    >
                      Detail
                      <EyeIcon className="w-4 h-4" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default TransactionStore;
