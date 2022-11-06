import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import actionCable from "actioncable";
import { BrowserRouter } from "react-router-dom";
const CableApp = {};

CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <App cable={CableApp}/>
        </BrowserRouter>
    </React.StrictMode>
);
