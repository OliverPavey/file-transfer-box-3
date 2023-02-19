import FileInfo from "../../types/fileInfo";
import {Dispatch} from "redux";
import {Action, ActionType} from "../actions";
import {fieldComparator} from "../../utils/comparators";

export const sortList = (apiHost: string, sortField: keyof FileInfo, fileInfos: FileInfo[]) => {
    return async (dipatch: Dispatch<Action>) => {
        dipatch({
            type: ActionType.SORT_LIST,
            sortField,
            fileInfos: fileInfos.sort(fieldComparator(sortField)),
        });
    }
}