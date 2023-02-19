import "./FileList.css";
import {FC, MouseEventHandler, useEffect, useState} from "react";
import {useActions, useFtbSelector} from "../redux";
import {Download, Trash} from "react-bootstrap-icons"; // https://icons.getbootstrap.com/
import prettyBytes from "pretty-bytes";
import FileInfo from "../types/fileInfo";
import {asLocalDate} from "../utils/dateUtils";
import {FtbState} from "../redux/reducer";

interface FileListProps {
    apiHost: string;
}

const FileList: FC<FileListProps> = (props) => {
    const {apiHost} = props;
    const [loaded, setLoaded] = useState(false);
    const {dispatchDeleteFile, dispatchRefreshList, dispatchSortList} = useActions();
    const {updated, fileInfos, sortField} = useFtbSelector<FtbState>((state: FtbState) => state);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            setTimeout(() => dispatchRefreshList(apiHost, sortField), 50);
        }
    }, [loaded, apiHost, sortField, dispatchRefreshList]);

    const refreshClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        dispatchRefreshList(apiHost, sortField);
    };

    const deleteClick = async (filename: string) => {
        const refreshList = () => dispatchRefreshList(apiHost, sortField);
        dispatchDeleteFile(apiHost, filename, refreshList)
    };

    const sortByField = (sortField: keyof FileInfo, data = fileInfos) => {
        dispatchSortList(apiHost, sortField, fileInfos)
    };

    const sortHtmlClass = (sortFieldSelected: keyof FileInfo) => {
        const highlight = sortFieldSelected === sortField;
        return `badge rounded-pill ${highlight ? 'bg-primary' : 'bg-secondary'}`;
    };

    const down = (<span>&#x25BC;</span>);
    const trash = (<Trash/>);
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
                    <td>Filename <span className={sortHtmlClass('name')}
                                       onClick={e => sortByField('name')}>{down}</span>
                    </td>
                    <td>Size <span className={sortHtmlClass('bytes')}
                                   onClick={e => sortByField('bytes')}>{down}</span>
                    </td>
                    <td>Modified <span className={sortHtmlClass('modified')}
                                       onClick={e => sortByField('modified')}>{down}</span>
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
                                <button className="btn btn-sm btn-outline-danger" title="Delete"
                                        onClick={e => deleteClick(`${fileInfo.name}`)}>{trash}</button>
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