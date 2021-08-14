import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "./styles/index.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById("root"),
);
