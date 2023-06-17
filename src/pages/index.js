import Image from "next/image";
import { Inter } from "next/font/google";
import { getSession, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  console.log(session);

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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session: session,
    },
  };
}
