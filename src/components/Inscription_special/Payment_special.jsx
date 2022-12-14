import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Url from "../../api/Apiurl";
import styles from "./Inscription_special.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactDOM from "react-dom";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import { FcInspection, FcCancel } from "react-icons/fc";
import Counterpart from "counterpart";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import { BrowserRouter, Link, Route, Switch, useLocation } from 'react-router-dom';
import en from "../../languages/en-US";
import ar from "../../languages/en-US";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
const { SearchBar } = Search;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const nom = urlParams.get('nom');
class Payment_special extends Component {
    state = {
        row: {},
        levels: [],
        selectedFile: null,
        file: null,
    };
    Payment_verif() {
       console.log(this.props);
    }
    fileSelect = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        this.setState({ file: URL.createObjectURL(event.target.files[0]) });
    };
    fileUpload = () => {
        console.log(this.state);
        if ((this.mandat.value == "")) {
            ReactDOM.render(
                <Alert variant="filled" severity="error">
                        fill the requires
                    </Alert>,
                document.getElementById("alert")
            );
        }else{
        if (this.state.selectedFile == null) {
            ReactDOM.render(
                <React.Fragment>
                    <Alert variant="filled" severity="error">
                        {Counterpart.translate("choose_file")}
                    </Alert>
                </React.Fragment>,
                document.getElementById("alert")
            );
        } else {
            ReactDOM.render(
                <div>
                <input
                       className="conpteur_progress"
                       type="text"
                       ref={(val) => (this.percent = val)}
                                                />
                <div class="progress">
  <div class="progress-bar bg-success" id="progress_bar"  role="progressbar" style={{width: "0%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
       
       </div><hr/></div>,
                document.getElementById("progress")
            );
            console.log(this.state);
            const fd = new FormData();
            fd.append("image", this.state.selectedFile);
            var posturl = Url.url + "pricing_special_session/upload_payment_special.php?guest_id="+this.props.guest_id+"&num="+this.mandat.value;
            axios
                .post(
                    posturl,
                    fd, {
                    onUploadProgress: progressEvent => {
                        console.log("loading...", Math.round((progressEvent.loaded / progressEvent.total) * 100), "%");
                        document.getElementById("progress_bar").value = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                        
                       
                     if(Math.round((progressEvent.loaded / progressEvent.total) * 100)==100){
                        this.percent.value="done!"
                        ReactDOM.render(
                            <div>
                               <h1>{Counterpart.translate("payment_proccessing")}</h1>
                               <div className="backto_list_btn"><a 
                                    href="https://uism-tn.com/api/pricing_special_session/pricing_special_session.php"
                                    className="a_back_tolist"
                                    >
                                        الرجوع إلى قائمة الدورات 
                                        </a></div>
                        </div>,
                            document.getElementById("payemment_back")
                        );
                     }else{
                        this.percent.value=Math.round((progressEvent.loaded / progressEvent.total) * 100)+ "%";
                        document.getElementById( "progress_bar" ).style.width=Math.round((progressEvent.loaded / progressEvent.total) * 100)+ "%";
                     }
                    }
                }
                ) 
                .then((res) => {
                    console.log(res);
                });
        }} 
    };
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/pricing_special_session">
                        <div id="payemment_back">
                        <p className="mail_verif_succes">{Counterpart.translate("mail_topayment")}</p>  
                        <h1>Payment</h1>
                        <hr/>
                        <p id="alert"></p>
                        <input
                                           type="text"
                                           class="form-control"
                                           placeholder="Put your confirmation key here"
                                           ref={(val) => (this.mandat = val)}
                                                />
                                            <hr />
                                            <div id="img_payment"></div>
                                            <input
                                           type="file"
                                           class="form-control"
                                           placeholder="Put your confirmation key here"
                                           ref={(val) => (this.file = val)}
                                           onChange={this.fileSelect}
                                                />
                                            <hr />
                                            <div id="progress"></div>
                                            <button 
                                           onClick={()=>{this.fileUpload()}}
                             className="btn btn-success">
                             send
                            </button>
                            </div>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}
export default Payment_special;
