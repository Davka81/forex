import Cookies from "js-cookie";

import axiosInstance from "@/utils/axios";
import { COOKIE_DOMAIN, JWT_COOKIE_NAME } from "@/utils/constants";

const signin = async (params: { email: string; password: string, device_id: string | undefined }) => {
  const { data } = await axiosInstance.post(`/v1/auth/login`, params);
  return data;
}

const loginGoogle = async (params: { idToken: string }): Promise<{ accessToken: string }> => {
  const { data } = await axiosInstance.post("/v1/auth/google", params);
  return data;
}

const logout = async () => {
  await axiosInstance.post("/v1/auth/logout");
  Cookies.remove(JWT_COOKIE_NAME, { path: "/", domain: COOKIE_DOMAIN });
  delete axiosInstance.defaults.headers.common.Authorization;
}

export default {
  signin,
  loginGoogle,
  logout,
}