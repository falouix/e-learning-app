import React, { Component, sessionStorage } from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import "../../App.css";
import Navbar from "../navbar/navbar";
import Navbar_s from "../navbar/navbar_s";
import styles from "./Login.css";
import axios from "axios";
import CreateCompte from "./CreateCompte";
import { useForm } from "react-hook-form";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Payments from "./Payments";
import ForgetPassword from "./ForgetPassword";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
class Login_test extends Component {
 
  render() {
      console.log("login test")
    return(
        <Router>
        <Switch>
            <Route path="/login">
      <h1>test</h1>
      </Route>
      </Switch>
      </Router>
    );
  }

}
export default Login_test;
