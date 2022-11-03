import React, { Component } from "react";
import axios from "axios";
import Payment_special from "./Payment_special";
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import { BrowserRouter, Link, Route, Switch, useLocation } from 'react-router-dom';
import en from "../../languages/en-US";
import ar from "../../languages/en-US";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
class Mail_verification extends Component {
    Mail_verif(){
        console.log(this.props.guest_id);
        console.log(this.props.clef);
     if(this.key.value!=this.props.clef){
        ReactDOM.render(
            <> {Counterpart.translate("wrong_nbr")}</>,
           document.getElementById("alert_verif")
         );
}else{
    console.log(true);
    var posturl = Url.url + "pricing_special_session/verifi_mail_guest.php?id=";
    axios
      .post(posturl,
        {guest_id:this.props.guest_id}
        )
      .then(({ data }) => {
          console.log(data);
              ReactDOM.render(
           <Payment_special guest_id={this.props.guest_id} />,
              document.getElementById("Payment_special")
                  );
      });
}
    }
    state = {
        row: {},
        levels: [],
        selectedFile: null,
        file: null,
    };
    //id_handler
    //RENDER
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/pricing_special_session">
                          <div id="Payment_special">
                             <p id="alert_verif" className="p_mail_verif_succes">{Counterpart.translate("mail_check")}</p>
                                      <input
                                           type="text"
                                           class="form-control"
                                           placeholder="Put your confirmation key here"
                                           ref={(val) => (this.key = val)}
                                                />
                                            <hr />
                                         <button 
                                           onClick={()=>{this.Mail_verif()}}
                             className="btn-inscrip_succes">
                             {Counterpart.translate("verif")}
                            </button>
                            </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Mail_verification;
