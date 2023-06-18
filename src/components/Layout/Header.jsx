import {
  ArrowLeftOnRectangleIcon,
  BuildingStorefrontIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Button, Menu, Text } from "@mantine/core";
import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const session = useSession();
  const router = useRouter();
  // console.log(session);
  return (
    <header className="sticky items-center px-5 justify-between bg-white border-b-[1px] top-0 h-12 flex">
      <span className="font-medium text-primary cursor-pointer">
        UMKM Niaga
      </span>

      {/* Jika belum login */}
      {session.status === "unauthenticated" && (
        <button
          onClick={() => router.push("/auth")}
          className="bg-primary text-sm text-white px-3 py-1 rounded hover:bg-primary-focus transition-all"
        >
          Login
        </button>
      )}
      {/* Jika login */}
      <div className="flex gap-3">
        {!session?.data?.user.store && (
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
              <button className="text-sm flex gap-1 items-center">
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
              {session.data.user.store && (
                <Menu.Item
                  onClick={() => router.push("/profile")}
                  icon={<BuildingStorefrontIcon className="w-4" />}
                >
                  Toko Saya
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
