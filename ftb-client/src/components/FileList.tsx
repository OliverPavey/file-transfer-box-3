import {FC, MouseEventHandler, useEffect, useState} from "react";
import axios from "axios";
import prettyBytes from "pretty-bytes";
import {Download, Trash} from "react-bootstrap-icons"; // https://icons.getbootstrap.com/
import ActionDistributor from "../utils/ActionDistributor";
import "./FileList.css";

interface FileInfo {
    name: string,
    bytes: number,
    modified: number,
}

const asLocalDate = (modified: number): string =>
    new Date(modified).toLocaleString().replace(",", "");

const fieldComparator = <T extends any>(field: keyof T): (a: T, b: T) => number => (a, b) =>
    a[field] === b[field] ? 0 : a[field] > b[field] ? 1 : -1;

interface FileListProps {
    apiHost: string;
    listRefreshAction: ActionDistributor;
}

const FileList: FC<FileListProps> = (props) => {
    const {apiHost, listRefreshAction} = props;
    const [loaded, setLoaded] = useState(false);
    const [updated, setUpdated] = useState<number>(0);
    const [fileInfos, setFileInfos] = useState<FileInfo[]>([]);
    const [sortOrder, setSortOrder] = useState<keyof FileInfo>('name');

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            refreshList();
        }
    }, []);

    const refreshList = async () => {
        const {data} = await axios.get(`${apiHost}/api/list`);
        sortByAndUpdateState(sortOrder, data);
        setUpdated(Date.now());
    };
    listRefreshAction.setAction(refreshList);

    const refreshClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        refreshList();
    };

    const deleteClick = async (filename: string) => {
        await axios.delete(`${apiHost}/api/drop/${filename}`);
        refreshList();
    };

    const sortByAndUpdateState = (sortField: keyof FileInfo, data = fileInfos) => {
        const sorted = data.sort(fieldComparator(sortField));
        setFileInfos(sorted);
        setSortOrder(sortField);
    };

    const sortClass = (sortField: keyof FileInfo) => {
        const highlight = sortField === sortOrder;
        return `badge rounded-pill ${highlight ? 'bg-primary' : 'bg-secondary'}`;
    };

    const down = (<span>&#x25BC;</span>);
    //const down = (<BsDownload/>);
    //const down = (<i className="download"></i>);
    //const trash = (<span>&#x1F5D1;</span>);
    const trash = (<Trash/>);
    //const download = (<span><strong>&#x21E9;</strong></span>);
    const download = (<Download/>);

    return (<div className="card">
        <div className="card-body">
            <span>Files available to download</span>
            <span className="float-end">
                <span className="fw-light text-muted small">Loaded at {asLocalDate(updated)}&nbsp;</span>
                <button className="btn btn-primary btn-sm" onClick={refreshClick}>Refresh</button>
            </span>
            <table className="table">
                <thead>
                <tr>
                    <td>Filename <span className={sortClass('name')}
                                       onClick={e => sortByAndUpdateState('name')}>{down}</span>
                    </td>
                    <td>Size <span className={sortClass('bytes')}
                                   onClick={e => sortByAndUpdateState('bytes')}>{down}</span>
                    </td>
                    <td>Modified <span className={sortClass('modified')}
                                       onClick={e => sortByAndUpdateState('modified')}>{down}</span>
                    </td>
                </tr>
                </thead>
                <tbody>
                {fileInfos.map(fileInfo =>
                    <tr key={fileInfo.name}>
                        <td>
                            {fileInfo.name}
                            <span className="float-end">
                                <a href={`${apiHost}/api/pull/${fileInfo.name}`}>
                                    <button className="btn btn-sm btn-outline-success"
                                            title="Download">{download}</button>
                                </a>&nbsp;
                                <a href="#" onClick={e => deleteClick(`${fileInfo.name}`)}>
                                    <button className="btn btn-sm btn-outline-danger" title="Delete">{trash}</button>
                                </a>
                            </span>
                        </td>
                        <td>{prettyBytes(fileInfo.bytes)}</td>
                        <td>{asLocalDate(fileInfo.modified)}</td>
                    </tr>)}
                </tbody>
            </table>
            {fileInfos.length} files.
        </div>
    </div>);
};

export default FileList;