import React, { useState, sessionStorage } from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import "../../App.css";
import Navbar from "../navbar/navbar";
import styles from "./Login.css";
import axios from "axios";
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import CreateCompte from "./CreateCompte";
import { useForm } from "react-hook-form";
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Payments from "./Payments";
import ForgetPassword from "./ForgetPassword"
const Login = () => {
    function shoot() {
        ReactDOM.render(
            <React.StrictMode>
                <CreateCompte />
            </React.StrictMode>,
            document.getElementById("root")
        );
    }
    function forgetpass() {
        ReactDOM.render(
            <React.StrictMode>
                <ForgetPassword />
            </React.StrictMode>,
            document.getElementById("root")
        );
    }
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    var test_var = getUrlParameter('test_var');



    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState();

    const onSubmit = (data, e) => {
        setMessage({
            data: "Login is in progress...",
            type: "alert-warning",
        });
        axios
            .post(`https://uism-tn.com/api/login.php`, { data })
            .then((res, error) => {
                window.sessionStorage.setItem(
                    "session",
                    JSON.stringify(res.data.session)
                );
                if (res.data.success == 1) {
                    console.log(res.data)
                    if (res.data.session.type == 'etudiant' && (res.data.niveau_etudiant == -1)) {
                        ReactDOM.render(
                            <React.StrictMode>
                                <Payments id={res.data.session.id_etudiant} type_payment={res.data.type_payment} />
                            </React.StrictMode>,
                            document.getElementById("root")
                        );
                    } else {
                        setMessage({
                            data: error || "Logged in successfully, redirecting...",
                            type: error ? "alert-danger" : "alert-success",
                        });
                        !error &&
                            setTimeout(() => {
                                localStorage.setItem("token", data.token);
                                ReactDOM.render(
                                    <React.StrictMode>
                                        <App />
                                    </React.StrictMode>,
                                    document.getElementById("root")
                                );
                                ReactDOM.render(
                                    <React.StrictMode>
                                        <Navbar />
                                    </React.StrictMode>,
                                    document.getElementById("sid_bar")
                                );
                            }, 1000);

                        !error && e.target.reset();
                    }

                } else {
                    setMessage({
                        data: error || res.data.msg,
                        type: error ? "alert-danger" : "alert-danger",
                    });
                    error &&
                        setTimeout(() => {
                            localStorage.setItem("token", data.token);
                            //history.push("/login");
                        }, 1000);
                }
            });
    };
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/Clef_expired">
                    <div
                        className={`div_login container-fluid d-flex align-items-center justify-content-center`}
                    >
                        <div className={styles.loginFormContainer}>
                            {message && (
                                <div
                                    className={`alert fade show d-flex ${message.type}`}
                                    role="alert"
                                >
                                    {message.data}
                                    <span
                                        aria-hidden="true"
                                        className="ml-auto cursor-pointer"
                                        onClick={() => setMessage(null)}
                                    >
                                        &times;
            </span>
                                </div>
                            )}
                            <fieldset className="border-form p-3 rounded">
                                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                    <div className="d-flex align-items-center">
                                        <button
                                            type="submit"
                                            size="lg"
                                            className="btn btn-outline-primary"
                                        >
                                            Resend confirmation email
              </button>

                                        <div className="d-flex align-items-center">
                                            <button
                                                type="submit"
                                                size="lg"
                                                className="btn btn-outline-primary"
                                            >
                                                Login
              </button>
                                        </div>
                                </form>
                                    <div className="d-flex align-items-center creat_comp">
                                        <button
                                            onClick={shoot}
                                            size="lg"
                                            className="btn btn-outline-primary"
                                        >
                                            Create Account
              </button>
                                    </div>
                                    <div className="d-flex align-items-center creat_comp">
                                        <span
                                            onClick={forgetpass}
                                            size="lg"
                                            className="btn-outline-primary"
                                        >
                                            Mot de passe oublié ?
              </span>
                                    </div>
                            </fieldset>
                        </div>
                        </div>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Login;
