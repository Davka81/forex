import { RootState } from "@/redux/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Use throughout your app instead of plain `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
