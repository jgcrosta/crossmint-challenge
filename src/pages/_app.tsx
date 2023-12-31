import { type AppType } from "next/app";
import { Toaster } from "~/components/ui/toaster";

import { api } from "~/server/api/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
};

export default api.withTRPC(MyApp);
