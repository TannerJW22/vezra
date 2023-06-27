import type { RootState, TypedUseSelectorHook } from "@/lib/types";

import { useSelector } from "react-redux";

export const useVezraSelector: TypedUseSelectorHook<RootState> = useSelector;
export default useVezraSelector;
