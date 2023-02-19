import {Dispatch} from "redux";
import {Action, ActionType} from "../actions";
import axios from "axios";
import {fieldComparator} from "../../utils/comparators";
import FileInfo from "../../types/fileInfo";

export const refreshList = (apiHost: string, sortField: keyof FileInfo) => {
    return async (dipatch: Dispatch<Action>) => {
        dipatch({
            type: ActionType.REFRESH_LIST,
        });

        try {
            const {data} = await axios.get(`${apiHost}/api/list`);
            dipatch({
                type: ActionType.REFRESH_LIST_SUCCESS,
                updated: Date.now(),
                fileInfos: data.sort(fieldComparator(sortField)),
            });
        } catch (err: unknown) {
            console.log("Refresh Failed", err);
        }
    }
}