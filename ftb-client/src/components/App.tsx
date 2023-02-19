import FileList from "./FileList";
import {FC} from "react";
import FileUpload from "./FileUpload";
import Folder from "./Folder";
import {Provider} from "react-redux";
import {store} from "../redux";

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

    return <Provider store={store}>
        <div className="container">
            <Title/>
            <br/>
            <FileList apiHost={apiHost}/>
            <br/>
            <FileUpload apiHost={apiHost}/>
            <br/>
            <Folder apiHost={apiHost}/>
        </div>
    </Provider>
};

export default App;