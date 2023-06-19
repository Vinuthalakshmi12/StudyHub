import {useDispatch} from "react-redux"
import { AppDispatch} from "@/store/index";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;