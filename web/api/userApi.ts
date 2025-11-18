import { UserJWTData } from "@/shared/dto/UserDto";
import axiosInstance from "@/utils/axios";

const me = async (): Promise<UserJWTData> => {
  const { data } = await axiosInstance.get("/v1/auth/me");
  return data;
}

export default { me }