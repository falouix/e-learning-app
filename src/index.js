import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
  Redirect,
} from "react-router-dom";
import Inscription_special from "./components/Inscription_special/Inscription_special";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/navbar";
import Navbar_s from "./components/navbar/navbar_s";
import Login from "./components/Login/Login";
var data = JSON.parse(sessionStorage.getItem("session"));
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const nom = urlParams.get("nom");
sessionStorage.setItem("reloading_flag", 2);
var url = window.location.href;
var pathname = window.location.pathname;
var origin = window.location.origin;
console.log("full url", url);
console.log("pathname", pathname);
console.log("origin", origin);
if (data != null) {
  sessionStorage.setItem("reloading_flag", 0);
  console.log(data.type);
  if (data.type == "etudiant" || data.type == "enseignant") {
    console.log("etudiant loggged in");
    ReactDOM.render(
      <React.StrictMode>
        <Router>
          <Route path="/app" exact>
            <App />
          </Route>
        </Router>
      </React.StrictMode>,
      document.getElementById("root")
    );
    ReactDOM.render(
      <React.StrictMode>
        <Router>
          <Route path="/app" exact>
            <Navbar_s />
          </Route>
        </Router>
      </React.StrictMode>,
      document.getElementById("sid_bar")
    );
  }
  if (data.type == "user") {
    console.log("user loggged in");
    ReactDOM.render(
      <React.StrictMode>
        <Router>
          <Route path="/app" exact>
            <App />
          </Route>
        </Router>
      </React.StrictMode>,
      document.getElementById("root")
    );
    ReactDOM.render(
      <React.StrictMode>
        <Router>
          <Route path="/app" exact>
            <Navbar />
          </Route>
        </Router>
      </React.StrictMode>,
      document.getElementById("sid_bar")
    );
  }
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Route path="/">
          <Login />
        </Route>
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
}
if (id != null) {
  console.log(nom);
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Route path="/pricing_special_session">
          <Inscription_special />
        </Route>
      </Router>
    </React.StrictMode>,
    document.getElementById("div_inscrit")
  );
}
if (data != null) {
  var pathname1 = window.location.pathname;
  if (window.location.pathname != "/app") {
    window.location.pathname = "app";
  }
} else {
}
serviceWorker.register();
