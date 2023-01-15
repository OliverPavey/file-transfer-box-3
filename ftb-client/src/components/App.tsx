import FileList from "./FileList";
import {FC} from "react";
import FileUpload from "./FileUpload";
import Folder from "./Folder";
import ActionDistributor from "../utils/ActionDistributor";

const Title: FC = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <span className="navbar-brand">File Transfer Box</span>
        </div>
    </nav>)

const App: FC = () => {
    console.log("process.env.NODE_ENV=", process.env.NODE_ENV);

    const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    const apiHost = development ? 'http://localhost:8080': '';

    const listRefreshAction = new ActionDistributor();

    return <div className="container">
        <Title/>
        <br/>
        <FileList apiHost={apiHost} listRefreshAction={listRefreshAction}/>
        <br/>
        <FileUpload apiHost={apiHost} listRefreshAction={listRefreshAction}/>
        <br/>
        <Folder apiHost={apiHost}/>
    </div>
};

export default App;