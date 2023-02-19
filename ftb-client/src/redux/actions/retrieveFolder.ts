import {Dispatch} from "redux";
import {Action, ActionType} from "../actions";
import axios from "axios";
import {DataFunction, ErrorFunction} from "../../types/common";

export const retrieveFolder = (apiHost: string, onSuccess: DataFunction<string>, onFailure: ErrorFunction) => {
    return async (dipatch: Dispatch<Action>) => {
        dipatch({
            type: ActionType.RETRIEVE_FOLDER,
        });

        try {
            const {data} = await axios.get(`${apiHost}/api/folder`);
            onSuccess(data);
        } catch (err: unknown) {
            console.log("Failed to determine remote folder.", err);
            onFailure(err);
        }
    }
}