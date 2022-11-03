import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Navbar from "./components/navbar/navbar";
import Navbar_s from "./components/navbar/navbar_s";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
var data = JSON.parse(sessionStorage.getItem("session"));

export default function Index_app() {
    if (data != null) {
        if (data.type == "etudiant" || data.type == "enseignant") {
          console.log("etudiant loggged in");
          return(
            <React.StrictMode>
              <Router>
                <Route path="/app" exact>
                  <App />
                </Route>
              </Router>
            </React.StrictMode>
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
                <Login />,
          document.getElementById("root")
        );
      }
}