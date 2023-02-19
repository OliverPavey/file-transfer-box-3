import {Action, ActionType} from "./actions";
import FileInfo from "../types/fileInfo";

export interface FtbState {
    updated: number;
    fileInfos: FileInfo[];
    sortField: keyof FileInfo;
}

export const initialFtbState: FtbState = {
    updated: 0,
    fileInfos: [],
    sortField: "name",
}

const reducer = (state: FtbState = initialFtbState, action: Action): FtbState => {
    switch (action.type) {
        case ActionType.REFRESH_LIST:
            return {...state};
        case ActionType.REFRESH_LIST_SUCCESS:
            return {
                ...state,
                updated: action.updated,
                fileInfos: action.fileInfos,
            };
        case ActionType.RETRIEVE_FOLDER:
            return {...state};
        case ActionType.SORT_LIST:
            return {
                ...state,
                fileInfos: action.fileInfos,
                sortField: action.sortField
            };
        case ActionType.UPLOAD_FILE:
            return {...state};
        default:
            return state;
    }
}

export default reducer;

export type RootState = ReturnType<typeof reducer>;