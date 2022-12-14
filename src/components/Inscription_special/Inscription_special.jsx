import React, { Component } from "react";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch, useLocation } from 'react-router-dom';
import en from "../../languages/en-US";
import ar from "../../languages/en-US";
import Dialog_box from './Dialog_box';
import Mail_verification from "./Mail_verification";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Url from "../../api/Apiurl";
import axios from "axios";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const nom = urlParams.get('nom');
class Inscription_special extends Component {
    //save and sign up guest function 
    sign_up(){
        if ((this.state.guest_name == "") || (this.state.guest_prenom == "") || (this.state.guest_cin == "")
            ||(this.state.guest_tel == "") || (this.state.guest_mail == "") || (this.state.guest_login == "")
        ){
        ReactDOM.render(
            <p className="alert_costum">{Counterpart.translate("Please_fill_all_the_required_fields")}</p>,
            document.getElementById("alert_costum")
        );
      }else{
        if(this.state.guest_cin.length!=8){
            ReactDOM.render(
                <p className="alert_costum">{Counterpart.translate("cin_wrong")}</p>,
                document.getElementById("alert_costum")
            );
        }else{
            var posturl = Url.url + "pricing_special_session/addGuest.php";
            axios
              .post(posturl,
                {  
                  key_conf:this.key_conf,
                  level_id:this.state.level_id,
                  guest_name: this.state.guest_name,
                  guest_prenom: this.state.guest_prenom,
                  guest_cin: this.state.guest_cin,
                  guest_tel: this.state.guest_tel,
                  guest_mail: this.state.guest_mail,
                  guest_login: this.state.guest_login,
                }
              )
              .then(({ data }) => {
                  console.log(data);
                  if(data.msg=="Email already exist"){
                    ReactDOM.render(
                        <p className="alert_costum">{Counterpart.translate("Email_already_Address")}</p>,
                        document.getElementById("alert_costum"));
                  }else{
                      if(data.msg=="Login already exist"){
                        ReactDOM.render(
                            <p className="alert_costum">{Counterpart.translate("Login_already_exist")}</p>,
                            document.getElementById("alert_costum"));
                    }else{
                        if(data.msg=="Phone number already exist"){
                            ReactDOM.render(
                                <p className="alert_costum">{Counterpart.translate("phone_number_exist")}</p>,
                                document.getElementById("alert_costum"));
                        }else{
                  ReactDOM.render(
                    <Mail_verification clef={this.key_conf} guest_id={data.id_guest} />,
                    document.getElementById("Payment_special")
                  );}}}
                  
              });
                  console.log("save");
          };
        }}
    
    mail_send="";
    key_conf=Math.floor(Math.random() * 100001);
    state = {
        key_conf:this.key_conf,
        row: {},
        levels: [],
        selectedFile: null,
        file: null,
        test:"",
        level_id:id,
        guest_name:"",
        guest_prenom: "",
        guest_cin: "",
        guest_tel: "",
        guest_mail: "",
        guest_login: "",
    };
    insert_guest() {
        console.log(this.key_conf);
    }

    //id_handler
    //RENDER
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route >
                        <div className="div_login padding-top89px">
                        <div id="Payment_special" className="big-container">
                            <div class="">
                                <h2 className="h2_inscrip">{nom}</h2>
                                <hr />
                                <div id="alert_costum"></div>
                                <div class="card-body">
                                    <div>
                                        <form onSubmit={()=>this.sign_up}>
                                            <div class="">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder={Counterpart.translate("prenom")}
                                                    ref={(val) => (this.prenom = val)}
                                                    onChange={()=>{
                                                        this.state.guest_prenom=this.prenom.value;
                                                    }}
                                                />
                                                <hr />
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder={Counterpart.translate("Name")}
                                                    ref={(val) => (this.nom = val)}
                                                    onChange={()=>{
                                                        this.state.guest_name=this.nom.value;
                                                    }}
                                                />
                                                <hr />
                                                <input
                                                    type="number"
                                                    class="form-control"
                                                    placeholder={Counterpart.translate("cin")}
                                                    ref={(val) => (this.cin = val)} 
                                                     onChange={()=>{
                                                        this.state.guest_cin=this.cin.value;
                                                    }}
                                                />
                                                <hr />
                                                <input
                                                    type="number"
                                                    class="form-control"
                                                    placeholder={Counterpart.translate("tel")}
                                                    ref={(val) => (this.tel = val)}
                                                    onChange={()=>{
                                                        this.state.guest_tel=this.tel.value;
                                                    }}

                                                />
                                                <hr />
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder={Counterpart.translate("mail")}
                                                    ref={(val) => (this.mail = val)}
                                                    onChange={()=>{
                                                        this.state.guest_mail=this.mail.value;
                                                    }}
                                                />
                                                <hr />
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder={Counterpart.translate("login")}
                                                    ref={(val) => (this.login = val)}
                                                    onChange={()=>{
                                                        this.state.guest_login=this.login.value;
                                                        console.log(this.mail_send);
                                                    }}
                                                />
                                                <hr />
                                                
                                            </div>
                                        </form>
                                        <Translate
                                                    content="btn_cancel"
                                                    component="button"
                                                    type="reset"
                                                    className="btn-inscrip_danger margin-right12px"
                                                />
                                        <button className="btn-inscrip_succes" onClick={()=>{
                                                    this.sign_up()
                                                }}>{Counterpart.translate("btn_save")}</button>
                                    </div>
                                    <div>
                                    <div className="backto_list_btn"><a 
                                    href="https://uism-tn.com/api/pricing_special_session/pricing_special_session.php"
                                    className="a_back_tolist"
                                    >
                                        الرجوع إلى قائمة الدورات 
                                        </a></div></div>
                                </div>
                        </div>
                        </div>
                        </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Inscription_special;
