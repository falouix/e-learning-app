import React, { Component} from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import "../../App.css";
import Navbar from "../navbar/navbar";
import Navbar_s from "../navbar/navbar_s";
import axios from "axios";
import CreateCompte from "./CreateCompte";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgetPassword from "./ForgetPassword";
import Counterpart from "counterpart";
class Login1 extends Component {
  data_session_storage={
  };
  sesision_data="";
  forget_pass(){
    ReactDOM.render(
      <React.StrictMode>
        <ForgetPassword />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
  CreateCompte() {
    ReactDOM.render(
      <React.StrictMode>
        <CreateCompte />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
  login(){
    window.sessionStorage.clear();
    if((this.login_users.value=="")||(this.pass_users.value=="")){
      ReactDOM.render(
        <>{Counterpart.translate("Please_fill_all_the_required_fields")}</>,
        document.getElementById("login_alert")
      );
    }else{
    axios
        .post(`https://uism-tn.com/api/login.php`, { 
          login_users:this.login_users.value,
          pass_users:this.pass_users.value
         })
        .then((res, error) => {
                  this.data_session_storage = JSON.parse(JSON.stringify(res.data));
                  console.log(res.data);
                  if(res.data.msg=="Vous deverz s'inscrire."){
                    ReactDOM.render(
                      <>{Counterpart.translate("please_create_account")}</>,
                      document.getElementById("login_alert")
                    );
                  }
                  if(res.data.session=="Un e-mail d'activation voua été envoyer, merci d'activer voptre compte."){
                    ReactDOM.render(
                      <>{Counterpart.translate("mail_check")}</>,
                      document.getElementById("login_alert")
                    );
                  }
                  if(res.data.msg=="an email has been sent check your mail box"){
                    ReactDOM.render(
                      <>{Counterpart.translate("mail_check")}</>,
                      document.getElementById("login_alert")
                    );
                  }
                  if(res.data.msg=="Mot de pass incorrect."){
                    ReactDOM.render(
                      <>{Counterpart.translate("wrong_login_pass")}</>,
                      document.getElementById("login_alert")
                    );
                  }
                  if(res.data.success==1){
                    console.log("login data storage",this.data_session_storage.session);
                    window.sessionStorage.setItem(
                      "session",
                      JSON.stringify(res.data.session)
                    ); 
                     this.sesision_data=JSON.parse(window.sessionStorage.getItem('session'));
                     if(this.data_session_storage.session.type=="user"){
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
                    );}
                    else{
                      console.log("student");
                      ReactDOM.render(
                        <Router>
                        <Route path="/app" exact>
                        <React.StrictMode>
                          <App />
                        </React.StrictMode></Route></Router>,
                        document.getElementById("root")
                      );
                      ReactDOM.render(
                        <React.StrictMode>
                          <Navbar_s />
                        </React.StrictMode>,
                        document.getElementById("sid_bar")
                      );
                    }
                  }
        });
       
      } 
        
  }
  render() {
    console.log(this.props)
    this.sesision_data=JSON.parse(window.sessionStorage.getItem('session'));
    console.log("session datta from login component",this.sesision_data);
    if(this.sesision_data==null){
    return(
        <div className="div_login container-fluid d-flex align-items-center justify-content-center">
          <div className="form_container">
            <img src="https://uism-tn.com/api/login-logo.png"/>
            <hr className="h1-login"/>
            <h1 className="h1-login">{Counterpart.translate("logging_in")}</h1>
            <hr className="h1-login"/>
            <div id="login_alert"></div>
            <input
                        name="login_users"
                        type="text"
                        className="form-control"
                        ref={(val) => (this.login_users = val)}
                        placeholder={Counterpart.translate("login")}
                      />
					   <input
                        type="password"
                        name="pass_users"
                        ref={(val) => (this.pass_users = val)}
                        placeholder={Counterpart.translate("pass_word")}
                      />
                      <hr/>
            <button
                        size="lg"
                        className="btn btn-outline-primary btn-login "
                      onClick={()=>{
                        this.login()
                      }}
                      >
                       <Link to="/">{Counterpart.translate("logging_in")}</Link> 
                </button>
                <a className="a-login-forget" onClick={()=>{this.forget_pass()}}>forget password</a>
                <hr className="h1-login"/>
                <button
                      size="lg"
                      className="btn btn-outline-primary btn-lgn-custtom btn-login1"
                      onClick={()=>{
                        this.CreateCompte();
                      }}
                    >{Counterpart.translate("Create_Account")}
                    </button>
          </div>
        </div>    
    );
  }else{
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
    return(
      <h1></h1>
    );
  }
  }

}
export default Login1;
