"use client";

import { store } from "@/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode, useState } from "react";


import Modals from "@/components/modals/modals";
import { GOOGLE_CLIENT_ID } from "@/utils/constants";


const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <ReduxProvider store={store}>
            <Modals />
            {children}
          </ReduxProvider>
        </GoogleOAuthProvider>
      </AntdRegistry>
    </QueryClientProvider>
  )
}

export default Providers;