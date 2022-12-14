import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
import Login from "./Login";
class Inscrit_success extends Component {
  backt_login(){
    ReactDOM.render(
       <Login/>,
       document.getElementById("root")
   )
  }
  render() {
    return(
      <div
              className={`div_login container-fluid d-flex align-items-center justify-content-center`}
            >
              <div className>
                <fieldset className="border-form p-3 rounded">
                    <h1 className="h1-succes-inscrit" >{Counterpart.translate("mail_check")}</h1>
            <hr/>
                  <button
                        type="submit"
                        size="lg"
                        className="btn btn-outline-primary btn-lgn-custtom"
                        
                      onClick={()=>{
                        this.backt_login()
                      }}
                      >
                        {Counterpart.translate("logging_in")}
                </button>
                </fieldset>
              </div>
            </div>
    );
  }

}
export default Inscrit_success;
