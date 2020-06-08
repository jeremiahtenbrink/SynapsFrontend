import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import AppProvider from "./utilities/AppProviders.js";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render( <Router>
    <AppProvider>
      <App/>
    </AppProvider>
  </Router>
  
  , document.getElementById( "root" ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
