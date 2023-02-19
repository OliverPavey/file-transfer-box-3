import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../reducer";

export const useFtbSelector: TypedUseSelectorHook<RootState> = useSelector;