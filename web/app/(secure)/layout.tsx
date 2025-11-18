"use client";

import { ConfigProvider, Layout } from "antd";
import { Poppins } from "next/font/google";
import { ReactNode, useState } from "react";

import HeaderRight from "@/components/ui/header/headerRight";

const { Header, Sider, Content } = Layout;

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean>(true);


  return (
    <>
      <ConfigProvider theme={{ token: { fontFamily: poppins.style.fontFamily } }}>
        <Layout className="h-full">
          <Header className="flex items-center justify-between !bg-white !h-[48px] pr-[20px] pl-[8px] border-b border-black/20 leading-normal">
            <HeaderRight />
          </Header>
          <Layout>
            <Content>{children}</Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default RootLayout;