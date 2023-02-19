import {Dispatch} from "redux";
import {Action, ActionType} from "../actions";
import axios from "axios";

export const deleteFile = (apiHost: string, filename: string, afterDelete: VoidFunction) => {
    return async (dipatch: Dispatch<Action>) => {
        dipatch({
            type: ActionType.DELETE_FILE,
            filename: filename,
        });

        try {
            await axios.delete(`${apiHost}/api/drop/${filename}`);
            afterDelete();
        } catch (err: unknown) {
            console.log("Delete failed.", err);
        }
    }
}