import { DepositDto, HistoryDto } from "@/shared/types";
import axiosInstance from "@/utils/axios";

const historyUpload = async (data: Array<HistoryDto>): Promise<{ success: boolean; inserted: number, skipped: number }> => {
  const { data: response } = await axiosInstance.post("/v1/history/upload", data);
  return response;
}

const depositUpload = async (data: Array<DepositDto>): Promise<{ success: boolean; inserted: number, skipped: number }> => {
  const { data: response } = await axiosInstance.post("/v1/deposit/upload", data);
  return response;
}

const deposit = async () => {
  const { data: response } = await axiosInstance.get("/v1/deposit/all");
  return response;
}

export default {
  historyUpload,
  depositUpload,
  deposit
}