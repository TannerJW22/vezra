import type { VezraDispatch } from "@/lib/types";

import { useDispatch } from "react-redux";

type DispatchFunc = () => VezraDispatch;
export const useVezraDispatch: DispatchFunc = useDispatch;
export default useVezraDispatch;
