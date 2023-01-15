import {FC, useEffect, useState} from "react";
import axios from "axios";

interface FolderProps {
    apiHost: string;
}

const Folder: FC<FolderProps> = (props) => {
    const {apiHost} = props;
    const [folder, setFolder] = useState('')

    const populateFolder = async () => {
        if (folder.length !== 0)
            return;
        const {data} = await axios.get(`${apiHost}/api/folder`);
        setFolder(data);
    };
    useEffect(() => {
        populateFolder();
    }, []);

    return (<div className="alert alert-secondary bg-light" role="alert">
        <span className="fw-light">Server Folder Location: </span>
        <span className="font-monospace">{folder}</span>
    </div>);
}

export default Folder;