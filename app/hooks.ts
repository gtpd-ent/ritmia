import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "./redux/store";

export const t_useDispatch: () => AppDispatch = useDispatch;
export const t_useSelector: TypedUseSelectorHook<RootState> = useSelector;
