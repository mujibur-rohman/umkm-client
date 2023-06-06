import Image from "next/image";
import { Inter } from "next/font/google";
import { signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  return (
    <main>
      <button
        className="bg-primary"
        onClick={() => signOut({ redirect: true, callbackUrl: "/auth" })}
      >
        Logout
      </button>
    </main>
  );
}
