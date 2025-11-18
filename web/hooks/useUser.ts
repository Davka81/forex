"use client";

import userApi from "@/api/userApi";
import { JWT_COOKIE_NAME } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const useUser = () => {
  const jwt = Cookies.get(JWT_COOKIE_NAME);

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["useApi.me"],
    queryFn: () => userApi.me(),
    retry: false,
    enabled: !!jwt
  });

  return { data, isLoading, isError, refetch }
}

export default useUser;