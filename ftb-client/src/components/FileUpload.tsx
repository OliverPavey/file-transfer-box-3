import {ChangeEventHandler, FC, MouseEventHandler, useId, useRef, useState} from "react";
import axios from "axios";
import ActionDistributor from "../utils/ActionDistributor";

interface FileUploadProps {
    apiHost: string;
    listRefreshAction: ActionDistributor;
}

const FileUpload: FC<FileUploadProps> = (props) => {
    const {apiHost, listRefreshAction} = props;
    const filenameId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileInputKey, setFileInputKey] = useState(0);

    const onUploadClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();

        const url = `${apiHost}/api/push/${file?.name}`;
        const config = {headers: {'Content-Type': 'application/octet-stream'}}
        await axios.post(url, file, config);

        setFile(null);
        setFileInputKey(fileInputKey + 1); // Changing the key will clear the <input>'s value
        listRefreshAction.callAction();
    };

    const onFileChange: ChangeEventHandler<HTMLInputElement> = event => {
        setFile((inputRef.current?.files || [null])[0]);
    };

    return (<div className="card">
        <div className="card-body">
            <form className="form">
                <div className="mb-3">
                    <label className="form-label" htmlFor={filenameId}>Upload a file</label>
                    <input className="form-control" type="file" ref={inputRef} id={filenameId} accept="*"
                           key={fileInputKey} onChange={onFileChange}/>
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary" onClick={onUploadClick} disabled={file === null}>Upload</button>
                </div>
            </form>
        </div>
    </div>);
}

export default FileUpload;