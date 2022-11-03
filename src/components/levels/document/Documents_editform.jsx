import React, { useState, Component } from "react";
import Documents_tab from "./Documents_tab";
import Documents_form from './Documents_form';
import axios, { post } from "axios";
import Url from "../../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import { IoIosCloudUpload } from "react-icons/io";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
import { date } from "faker";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class Documents_editform extends Component {
    // On file upload (click the upload button) 
    editfile = () => {
        console.log(this.props);
        // Create an object of formData
        console.log(this.documentname.value);
        if (this.documentname.value == "") {
            ReactDOM.render(
                <Alert variant="filled" severity="error">name is empty</Alert >,
                document.getElementById("alert")
            );
        } else {
            var posturl = Url.url + "Levels/Documents/updateDoc.php";
            axios.post(posturl, {
                file_id: this.props.row.id_documents,
                file_name: this.documentname.value
            }
            ).then(({ data }) => {
                console.log(data.msg == 'Document updated')
                if (data.msg == "Document updated") {
                    console.log(this.props)
                    ReactDOM.render(
                        <Documents_form state={this.props} />,
                        document.getElementById("doc_form")
                    );
                    ReactDOM.render(
                        <Documents_tab state={this.props} />,
                        document.getElementById("doc_tab")
                    );
                } else {
                    ReactDOM.render(
                        <Alert variant="filled" severity="error">{data.msg}</Alert >,
                        document.getElementById("alert")
                    );
                }
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="add_form">
                    <div
                        className="card text-white  studentform mb-3 shdw color-darblue "
                        id="title"
                    >
                        <div className="card-header" id="title">
                            <Translate content="add_document" component="h3" />
                        </div>
                        <div id="alert"></div>
                        <div class="card-body">
                            <div>
                                <form className="margin_t_3" >
                                    <div class="form-group">
                                        <input
                                            ref={(val) => (this.documentname = val)}
                                            type="text"
                                            Value={this.props.row.nom_reelle_document}
                                            class="form-control"

                                        />
                                    </div>
                                    <Translate
                                        content="btn_cancel"
                                        component="button"
                                        type="reset"
                                        className="btn btn-danger btnrt"
                                    /></form>
                                <button
                                    onClick={this.editfile}
                                    type="submit"
                                    component="button"
                                    class="btn btn-success btnrt margin_r_10"
                                >
                                    <Translate content="add_document" />
                                    <IoIosCloudUpload />

                                </button>
                                <hr />
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Documents_editform;
