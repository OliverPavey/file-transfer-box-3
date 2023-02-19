import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducer, {initialFtbState} from "./reducer";

export const store = createStore(reducer, initialFtbState, applyMiddleware(thunk));