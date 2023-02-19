import {Dispatch} from "redux";
import {Action, ActionType} from "../actions";
import axios from "axios";

export const uploadFile = (apiHost: string, file: File, afterUpload: VoidFunction) => {
    return async (dipatch: Dispatch<Action>) => {
        dipatch({
            type: ActionType.UPLOAD_FILE,
            file: file,
        });

        const url = `${apiHost}/api/push/${file?.name}`;
        const config = {headers: {'Content-Type': 'application/octet-stream'}}
        try {
            await axios.post(url, file, config);
            afterUpload();
        } catch (err: unknown) {
            console.log("Upload failed.", err);
        }
    }
}