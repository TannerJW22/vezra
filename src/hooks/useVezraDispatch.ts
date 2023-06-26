import { useDispatch } from "react-redux";
import type { VezraDispatch } from "@/store";

type DispatchFunc = () => VezraDispatch;
export const useVezraDispatch: DispatchFunc = useDispatch;
export default useVezraDispatch;
