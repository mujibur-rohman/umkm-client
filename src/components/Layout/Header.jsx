import useCart from "@/hooks/useCart";
import {
  ArchiveBoxIcon,
  ArrowLeftOnRectangleIcon,
  BuildingStorefrontIcon,
  ChevronDownIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Drawer, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Header = () => {
  const session = useSession();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const { cart, setCart } = useCart();

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, [setCart, router.pathname, opened]);

  return (
    <header className="sticky items-center px-5 justify-between bg-white z-10 border-b-[1px] top-0 h-12 flex">
      <Drawer opened={opened} onClose={close} title="Cart">
        <div className="flex flex-col gap-1">
          {cart?.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 rounded-lg p-3 overflow-hidden flex justify-between"
            >
              <div className="flex gap-2">
                <img
                  src={item.picture}
                  alt="product-image"
                  className="w-20 rounded-lg"
                />
                <div className="flex flex-col justify-between">
                  <p>{item.name}</p>
                  <p className="font-medium">Rp. {item.price}</p>
                </div>
              </div>
              <div className="flex flex-col self-start gap-1">
                <button
                  onClick={() => {
                    const oldCart = JSON.parse(localStorage.getItem("cart"));
                    const filterCart = oldCart.filter(
                      (prod) => prod.id !== item.id
                    );
                    setCart(filterCart);
                    localStorage.setItem("cart", JSON.stringify(filterCart));
                  }}
                  className="text-xs p-2 bg-error transition-colors hover:bg-warning-focus py-1 text-white rounded-md"
                >
                  Hapus Keranjang
                </button>
                <button
                  onClick={() => {
                    router.push(`/checkout/${item.id}`);
                    close();
                  }}
                  className="text-xs bg-warning transition-colors p-1 text-white rounded-md"
                >
                  Beli
                </button>
              </div>
            </div>
          ))}
        </div>
      </Drawer>

      <Link href="/" className="font-medium text-primary cursor-pointer">
        UMKM Niaga
      </Link>

      {/* Jika login */}
      <div className="flex gap-3">
        <button
          onClick={open}
          className="text-sm flex whitespace-nowrap relative gap-1 items-center"
        >
          <div className="rounded-full absolute px-1 -top-1 -left-1 bg-primary text-xs text-white">
            {cart?.length}
          </div>
          <ShoppingCartIcon className="w-5 text-black" />
        </button>

        {/* Jika belum login */}
        {session.status === "unauthenticated" && (
          <button
            onClick={() => router.push("/auth")}
            className="bg-primary text-sm text-white px-3 py-1 rounded hover:bg-primary-focus transition-all"
          >
            Login
          </button>
        )}
        {!session?.data?.user.store && session?.data?.user.email && (
          <button
            onClick={() => router.push("/store/add")}
            className="bg-primary text-sm text-white px-3 py-1 rounded hover:bg-primary-focus transition-all"
          >
            Buka Toko
          </button>
        )}
        {session.status === "authenticated" && (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <button className="text-sm flex whitespace-nowrap gap-1 items-center">
                {session.data.user.name}
                <ChevronDownIcon className="w-4" />
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                onClick={() => router.push("/profile")}
                icon={<UserIcon className="w-4" />}
              >
                Profil Saya
              </Menu.Item>
              <Menu.Item
                onClick={() => router.push("/transaction")}
                icon={<ShoppingBagIcon className="w-4" />}
              >
                Pesanan Saya
              </Menu.Item>
              {session.data.user.store && (
                <Menu.Item
                  onClick={() => router.push("/store/")}
                  icon={<BuildingStorefrontIcon className="w-4" />}
                >
                  Toko Saya
                </Menu.Item>
              )}
              {session.data.user.store && (
                <Menu.Item
                  onClick={() => router.push("/transaction/store")}
                  icon={<ArchiveBoxIcon className="w-4" />}
                >
                  Pesanan Toko
                </Menu.Item>
              )}
              <Menu.Item
                onClick={() =>
                  signOut({ redirect: true, callbackUrl: "/auth" })
                }
                icon={<ArrowLeftOnRectangleIcon className="w-4" />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
    </header>
  );
};

export default Header;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}
