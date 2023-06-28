import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import { SessionProvider } from "next-auth/react";

import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Layout/Header";
import { MantineProvider } from "@mantine/core";
import { useRouter } from "next/router";
import { ModalsProvider } from "@mantine/modals";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <ModalsProvider>
          <ToastContainer hideProgressBar />
          {router.pathname !== "/auth" && <Header />}
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
