import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "@/store";

export const useVezraSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useVezraSelector;
