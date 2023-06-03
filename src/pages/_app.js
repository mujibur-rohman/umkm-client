import "@/styles/globals.css";
import { ToastContainer, toast } from "react-toastify";
import { SessionProvider } from "next-auth/react";

import "react-toastify/dist/ReactToastify.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ToastContainer hideProgressBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
