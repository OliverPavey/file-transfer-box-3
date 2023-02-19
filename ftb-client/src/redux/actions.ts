import FileInfo from "../types/fileInfo";

export enum ActionType {
    DELETE_FILE = 'delete_file',
    UPLOAD_FILE = 'upload_file',
    REFRESH_LIST = 'refresh_list',
    REFRESH_LIST_SUCCESS = 'refresh_list_success',
    RETRIEVE_FOLDER = 'retrieve_folder',
    SORT_LIST = 'sort_list',
}

interface DeleteFileAction {
    type: ActionType.DELETE_FILE;
    filename: string;
}

interface UploadFileAction {
    type: ActionType.UPLOAD_FILE;
    file: File;
}

interface RefreshListAction {
    type: ActionType.REFRESH_LIST;
}

interface RefreshListSuccessAction {
    type: ActionType.REFRESH_LIST_SUCCESS;
    updated: number;
    fileInfos: FileInfo[];
}

interface RetrieveFolderAction {
    type: ActionType.RETRIEVE_FOLDER;
}

interface SortListAction {
    type: ActionType.SORT_LIST;
    sortField: keyof FileInfo;
    fileInfos: FileInfo[];
}

export type Action =
    | DeleteFileAction
    | RetrieveFolderAction
    | RefreshListAction
    | RefreshListSuccessAction
    | UploadFileAction
    | SortListAction