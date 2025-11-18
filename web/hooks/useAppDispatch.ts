import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

// Use throughout your app instead of plain `useDispatch`
const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;