import {FC, useEffect, useState} from "react";
import {useActions} from "../redux";

interface FolderProps {
    apiHost: string;
}

const Folder: FC<FolderProps> = (props) => {
    const {apiHost} = props;
    const [folder, setFolder] = useState('')
    const {dispatchRetrieveFolder} = useActions();

    useEffect(() => {
        const populateFolder = async () => {
            if (folder.length === 0) dispatchRetrieveFolder(apiHost,
                (value: string) => setFolder(value),
                (_) => setFolder("Unknown"));
        };
        populateFolder();
    }, [folder, apiHost, dispatchRetrieveFolder]);

    return (<div className="alert alert-secondary bg-light" role="alert">
        <span className="fw-light">Server Folder Location: </span>
        <span className="font-monospace">{folder}</span>
    </div>);
}

export default Folder;