"use client";

import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { FormProps } from "antd";
import Cookies from "js-cookie";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

import GoogleButton from "@/components/ui/button/googleBtn";

import authApi from "@/api/authApi";
import { setAxiosBearerToken } from "@/utils/axios";
import { JWT_COOKIE_NAME } from "@/utils/constants";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const Login = () => {
  const router = useRouter();

  const today = new Date();

  const onFinish = async (values: { email: string, password: string }) => {
    await authApi.signin({ ...values, device_id: undefined }).then((res: { accessToken: string }) => {
      setData(res.accessToken);
    });
  }

  const onFinishFailed: FormProps<{ email: string, password: string }>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (response: TokenResponse) => {
      onGoogleSignIn(response.access_token);
    },
    onError: (error: unknown) => {
      console.log('error:::', error);
    },
  });

  const onGoogleSignIn = async (token: string) => {
    authApi.loginGoogle({ idToken: token }).then(async (data) => {
      setData(data.accessToken);
    });
  }

  const setData = (token: string) => {
    Cookies.set(JWT_COOKIE_NAME, token);
    setAxiosBearerToken(token);
    router.push("/");
  }

  return (
    <div className={`${poppins.className} min-h-screen`}>
      <div className="grid grid-cols-12 h-screen">
        <div className="hidden md:block col-span-9 bg-[url('/images/coming-soon.webp')] bg-no-repeat bg-center bg-cover" />
        <div className="col-span-12 md:col-span-3 flex flex-col justify-between items-center p-[40px]">
          <div className="flex flex-col items-center justify-center h-full w-full">
            <GoogleButton
              onClick={() => googleLogin()}
            />
          </div>
          <p className="text-[13px]">AppinSoft LLC &copy;{today.getFullYear()}. All Right Reserved. </p>
        </div>
      </div>
    </div>
  )
}

export default Login