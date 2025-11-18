import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { BASE_URL, JWT_COOKIE_NAME } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Content-Type": "application/json",
  },
});

if (process.env.NEXT_PUBLIC_BASE_URL) {
  axiosInstance.defaults.baseURL = BASE_URL;
}

const currentToastIdTime = Math.floor(new Date().getTime() / 5000);

export const setAxiosBearerToken = (accessToken: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

export const setAxiosHeaderContentType = (type = "application/json") => {
  axiosInstance.defaults.headers["Content-Type"] = type;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.error.code === "INVALID_TOKEN") {
      Cookies.remove(JWT_COOKIE_NAME);
      return;
    }
    if (error.response.data?.error && error.response.data.error.message) {
      toast.error(`${error.response.data.error.message}`, {
        toastId: `${error.response.data.error.message}${currentToastIdTime}`,
      });
    } else {
      toast.error(`Error Code : ${error.code} Error Message : ${error.message}`, {
        toastId: `${error.code}${currentToastIdTime}`,
      });
    }
    return Promise.reject((error.response && error.response.data) || "Алдаа гарлаа");
  },
);

export default axiosInstance;

if (typeof window !== "undefined") {
  const accessToken = Cookies.get(JWT_COOKIE_NAME);
  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
}
