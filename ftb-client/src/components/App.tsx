import FileList from "./FileList";
import {FC, useState} from "react";
import FileUpload from "./FileUpload";
import Folder from "./Folder";
import ActionDistributor from "../utils/ActionDistributor";

const App: FC = () => {
    console.log("process.env.NODE_ENV=", process.env.NODE_ENV);

    const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    const apiHost = development ? 'http://localhost:8080': '';

    const listRefreshAction = new ActionDistributor();

    const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return <div className="container" data-bs-theme={theme}>
        <nav className={'navbar navbar-expand-lg navbar-' + theme + ' bg-' + theme}>
            <div className="container-fluid">
                <span className="navbar-brand">File Transfer Box</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>Toggle Theme</button>
            </div>
        </nav>
        <br/>
        <FileList apiHost={apiHost} listRefreshAction={listRefreshAction}/>
        <br/>
        <FileUpload apiHost={apiHost} listRefreshAction={listRefreshAction}/>
        <br/>
        <Folder apiHost={apiHost} theme={theme} />
    </div>
};

export default App;