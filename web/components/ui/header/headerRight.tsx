"use client";

import { Avatar, Button, Divider, Popover } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import DepositUploadModal from "@/components/modals/depositUploadModal";
import HistoryUploadModal from "@/components/modals/historyUploadModal";
import useModals from "@/hooks/useModals";
import useUser from "@/hooks/useUser";
import axiosInstance from "@/utils/axios";
import { COOKIE_DOMAIN, JWT_COOKIE_NAME } from "@/utils/constants";
import { getFirstCharacter } from "@/utils/utils";

const HeaderRight = () => {
  const router = useRouter();
  const { data: me } = useUser();
  const { openModal } = useModals();

  const handleHistoryUpload = () => {
    openModal(HistoryUploadModal, {
      props: {}
    });
  }

  const handleDepositUpload = () => {
    openModal(DepositUploadModal, {
      props: {}
    });
  }

  const logout = async () => {
    Cookies.remove(JWT_COOKIE_NAME, { path: "/", domain: COOKIE_DOMAIN });
    delete axiosInstance.defaults.headers.common.Authorization;
    router.push("/");
  }

  const getInitials = (name: string) => {
    if (!name) return "JD";
    return name
      .split(" ")
      .map(word => getFirstCharacter(word))
      .join("")
      .toUpperCase();
  }

  const content = (
    <div className="flex flex-col min-w-[200px]">
      <Button type="text" onClick={handleDepositUpload} className="justify-start py-[6px] px-[8px]">Deposit Upload</Button>
      <Button type="text" onClick={handleHistoryUpload} className="justify-start py-[6px] px-[8px]">Upload</Button>
      <Divider className="m-[1px]" />
      <Button type="text" onClick={logout} className="justify-start py-[6px] px-[8px]">Log out</Button>
    </div>
  )

  return (
    <div className="flex items-center justify-end w-full">
      <Popover
        trigger="click"
        content={content}
        styles={{
          body: {
            padding: "4px"
          }
        }}
      >
        <Avatar style={{ backgroundColor: "#daf0e1", cursor: "pointer", color: "#16794c", fontSize: "10px" }}>
          {me ? getInitials(me.name) : "JD"}
        </Avatar>
      </Popover>
    </div>
  );
}

export default HeaderRight;