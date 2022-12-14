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

class Login extends Component {
  on="0";
  componentDidMount(){
    console.log(window.localStorage.getItem("logout"));
  if (window.localStorage.getItem("logout") == 1) {
    window.localStorage.setItem("logout", 0);
    window.location.reload();
  }
  }
  data_session_storage={
  };
  sesision_data="";
  show_password(){
    var x = document.getElementById("myInput");
     if(this.on=="0"){
      x.type = "text";
       this.on="1";
       console.log(this.on)
     }else{
      this.on="0";
      x.type = "password";
      console.log(this.on)
     }
  }
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
    console.log(this.sesision_data.type);
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
          console.log("post back")
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
                  if(res.data.msg=="Login not successed."){
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
    return(
        <div className="div_login container-fluid d-flex align-items-center justify-content-center">
          <div className="form_container">
            <img src="https://uism-tn.com/api/login-logo.png"/>
            <hr className="h1-login margin_top-2-margin_bottom-6"/>
            <h1 className="h1-login margin_top-0-margin_bottom--5 ">{Counterpart.translate("logging_in")}</h1>
            <hr className="h1-login margin_top-2-margin_bottom-6"/>
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
                        id="myInput"
                        name="pass_users"
                        ref={(val) => (this.pass_users = val)}
                        placeholder={Counterpart.translate("pass_word")}
                      />
                      <a className="a_login" >
                        <input type="checkbox" 
                        onClick={()=>{this.show_password()}} 
                        className="checkbox_login"
                        ref={(val) => (this.show_pass = val)}
                        />
                        {Counterpart.translate("sho_pass")} 
                        </a>
                      <hr className="margin_top-2-margin_bottom-5"/>
            <button
                        size="lg"
                        className="btn btn-outline-primary btn-login "
                      onClick={()=>{
                        this.login()
                      }}
                      >
                       <Link to="/app">{Counterpart.translate("logging_in")}</Link> 
                </button>
                <a className="a-login-forget" onClick={()=>{this.forget_pass()}}>
                  {Counterpart.translate("forget_pass")}
                  </a>
                <hr className="h1-login"/>
                <button
                      size="lg"
                      className="btn btn-outline-primary btn-lgn-custtom btn-login1"
                      onClick={()=>{
                        this.CreateCompte();
                      }}
                    >{Counterpart.translate("Create_Account")}
                    </button>
                    <a
                      size="lg"
                      className="btn btn-outline-primary btn-lgn-custtom btn-login1"
                      href="https://uism-tn.com/api/pricing_special_session/pricing_special_session.php"
                    >{Counterpart.translate("sessions_spcl")}
                    </a>
          </div>
        </div>    
    );
  }

}
export default Login;
