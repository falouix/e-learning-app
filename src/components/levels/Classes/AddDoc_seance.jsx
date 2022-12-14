import React, { useState, Component } from "react";
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
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class addDoc_seance extends Component {
    placeholders = {
        document_name: Counterpart.translate("document_name"),
        order: Counterpart.translate("order"),
    };
    raw = {
        id: "",
        nom: "",
        prenom: "",
        cin: "",
        tel: "",
        mail: "",
        login: "",
    };
    state = {
        levels: [],
        selectedFile: null
    };
    //file upload
    onFileChange = event => {
        // Update the state 
        this.state.selectedFile = event.target.files[0];
        console.log("file", this.state.selectedFile.name);
    };
    rerenderform() {
        ReactDOM.render(
            <React.Fragment>
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
                                        class="form-control"
                                        placeholder={this.placeholders.document_name}
                                        Value=""
                                    />
                                    <hr />
                                    <input
                                        ref={(val) => (this.document = val)}
                                        type="file"
                                        onChange={this.onFileChange}
                                        class="form-control ducument_input"
                                        placeholder={this.placeholders.nom}
                                    />
                                </div>
                                <Translate
                                    content="btn_cancel"
                                    component="button"
                                    type="reset"
                                    className="btn btn-danger btnrt"
                                /></form>
                            <button
                                onClick={this.insertdocument}
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
            </React.Fragment>,
            document.getElementById("add_form")
        );
    }
    // On file upload (click the upload button) 
    insertdocument = () => {
        console.log("form props", this.props);
        // Create an object of formData
        const user = JSON.parse(window.sessionStorage.getItem('session'));
        if (this.state.selectedFile == null) {
            ReactDOM.render(
                <Alert variant="filled" severity="error"> Select file</Alert >,
                document.getElementById("alert")
            );
        }
        if (this.documentname.value == "") {
            ReactDOM.render(
                <Alert variant="filled" severity="error"> choose a name for the file</Alert >,
                document.getElementById("alert")
            );
        } else {
            //upload file 
            console.log("session storage", user.id_users);
            const fd = new FormData();
            var posturl1 = Url.url + "Levels/Documents/uploadDocs.php?id_user=" + user.id_users + "&seance_id=" + this.props.id + "&file_name=" + this.documentname.value + "&file_realname=" + this.state.selectedFile.name;
            fd.append("file", this.state.selectedFile, this.state.selectedFile.name);
            axios.post(posturl1, fd
            ).then(function ({ data }) {
                console.log("upload data", data);
                /*ReactDOM.render(
                    <Documents_tab state={prps} />,
                    document.getElementById("doc_tab"));*/
            });
        }
    };
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
                                            class="form-control"
                                            placeholder={this.placeholders.document_name}

                                        />
                                        <hr />
                                        <input
                                            ref={(val) => (this.document = val)}
                                            type="file"
                                            onChange={this.onFileChange}
                                            class="form-control ducument_input"
                                            placeholder={this.placeholders.nom}
                                        />
                                    </div>
                                    <Translate
                                        content="btn_cancel"
                                        component="button"
                                        type="reset"
                                        className="btn btn-danger btnrt"
                                    /></form>
                                <button
                                    onClick={this.insertdocument}
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
export default addDoc_seance;
