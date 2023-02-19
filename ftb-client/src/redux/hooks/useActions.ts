import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";

import {deleteFile as dispatchDeleteFile} from "../actions/deleteFile";
import {refreshList as dispatchRefreshList} from "../actions/refreshList";
import {retrieveFolder as dispatchRetrieveFolder} from "../actions/retrieveFolder";
import {uploadFile as dispatchUploadFile} from "../actions/uploadFile";
import {sortList as dispatchSortList} from "../actions/sortList";

export const useActions = () => {
    return bindActionCreators({
        dispatchDeleteFile,
        dispatchRefreshList,
        dispatchRetrieveFolder,
        dispatchUploadFile,
        dispatchSortList,
    }, useDispatch());
};