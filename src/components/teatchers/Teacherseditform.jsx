import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Avatar from './avatar';
import Avatar1 from '@material-ui/core/Avatar';
import Alert from "@material-ui/lab/Alert";
import Teachersform from './Teachersform';
import Teacherstab from "./Teacherstab";
import Close_button from './../../Close_button';
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import { Camera } from "react-bootstrap-icons";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";

Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);


class Teacherseditform extends Component {

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
        selectedFile: null,
        file: null,
        progress: 0,
    };
    //upload image

    fileSelect = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
        this.setState({ file: URL.createObjectURL(event.target.files[0]) });
        ReactDOM.render(
            <React.Fragment>
                <Avatar1 src={URL.createObjectURL(event.target.files[0])} />
            </React.Fragment>,
            document.getElementById("avatarbig")
        );
    };
    fileUpload = () => {
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
                <progress id="progress_bar" value="0" max="100" />,
                document.getElementById("progress")
            );
            console.log(this.state);
            const fd = new FormData();
            fd.append("image", this.state.selectedFile, this.props.index.id_enseignant);
            var posturl = Url.url + "Teachers/upload.php";
            axios
                .post(
                    posturl,
                    fd, {
                    onUploadProgress: progressEvent => {
                        console.log("loading...", Math.round((progressEvent.loaded / progressEvent.total) * 100), "%");
                        document.getElementById("progress_bar").value = Math.round((progressEvent.loaded / progressEvent.total) * 100);

                    }
                }
                )
                .then((res) => {
                    ReactDOM.render(
                        <Teacherstab state={this.props.state} />,
                        document.getElementById("tab")
                    );
                    ReactDOM.render(
                        <Teachersform state={this.props.sate} />,
                        document.getElementById("editForm")
                    );
                    console.log(res);
                });
        }
    };
    //update function 
    updateteacher = (event) => {
        var posturl = Url.url + "Teachers/updateTeachers.php";
        console.log(this.props.index.mail_enseignant);
        console.log(this.mail_enseignant);
        axios.post(posturl, {
            enseignant_id: this.props.index.id_enseignant,
            enseignant_name: this.nom_enseignant.value,
            enseignant_prenom: this.prenom_enseignant.value,
            enseignant_cin: this.cin_enseignant.value,
            enseignant_tel: this.tel_enseignant.value,
            enseignant_email: this.mail_enseignant.value,
            enseignant_login: this.login_enseignant.value,
        }).then((res) => {
            console.log(res.data);
            console.log(this.props.state);
            if (res.data.msg == "Teacher Updated") {
                ReactDOM.render(
                    <Teacherstab state={this.props.state} />,
                    document.getElementById("tab")
                );
                ReactDOM.render(
                    <Teachersform state={this.props.sate} />,
                    document.getElementById("editForm")
                );
            }
            if (res.data.msg == "Teacher Not Updated!") {
                ReactDOM.render(
                    <React.Fragment>
                        <Alert variant="filled" severity="error">
                            {Counterpart.translate("update_failed")}
                        </Alert>
                    </React.Fragment>,
                    document.getElementById("alert")
                );
            }
            if (res.data.msg == "Invalid Email Address!") {
                ReactDOM.render(
                    <React.Fragment>
                        <Alert variant="filled" severity="error">
                            {Counterpart.translate("Invalid_Email_Address")}
                        </Alert>
                    </React.Fragment>,
                    document.getElementById("alert")
                );
            }
            if (res.data.msg == "Please fill all the required fields!") {
                ReactDOM.render(
                    <React.Fragment>
                        <Alert variant="filled" severity="error">
                            {Counterpart.translate("Please_fill_all_the_required_fields")}
                        </Alert>
                    </React.Fragment>,
                    document.getElementById("alert")
                );
            }
        });

    }
    render() {

        console.log("values", this.props.index);
        let id = {
            id: this.props.index.id_enseignant,
            alt: this.props.index.nom_enseignant,
            class: "large",
        }
        console.log(id);

        return (
            <React.Fragment>
                <div
                    className="card text-white  userform mb-3 shdw color-darblue"
                    id="title"
                >   <span onClick={() =>
                    ReactDOM.render(
                        <React.Fragment>
                            <Teachersform state={this.props.state} />
                        </React.Fragment>,
                        document.getElementById("editForm")
                    )
                }>
<Close_button />
</span>
                    <div className="card-header" id="title">
                     
                        <Translate className="edit_subject_title"  content="edit" component="h3" />
                    </div>
                    <div className="cntrdiv">
                        <div id="avatarbig">
                            <Avatar id={id} />
                        </div>
                        <div class="button-wrap">
                            <label className="grab " for="upload">
                                <Camera className="mrgn_top_120" color="royalblue" size={20} />
                            </label>
                            <input
                                id="upload"
                                type="file"
                                className="input_avatar"
                                onChange={this.fileSelect}
                            />
                        </div>
                        <div id="progress"></div>
                        <br />
                        <Translate
                            content="save_img"
                            component="Button"
                            onClick={this.fileUpload}
                            className="btn btn-success"
                        />
                    </div>
                    <div>
                        <hr />
                    </div>
                    <div id="alert"></div>
                    <div className="card-body">
                        <div>
                            <form >
                                <div className="form-group">
                                    <input
                                        ref={(val) => (this.nom_enseignant = val)}
                                        Value={this.props.index.nom_enseignant}
                                        type="text"
                                        className="form-control"
                                        id="nom"
                                        placeholder="nom"
                                    />
                                    <hr />
                                    <input
                                        ref={(val) => (this.prenom_enseignant = val)}
                                        Value={this.props.index.prenom_enseignant}
                                        type="text"
                                        className="form-control"
                                        id="prenom"
                                        placeholder="Prenom"
                                    />
                                    <hr />
                                    <input
                                        ref={(val) => (this.cin_enseignant = val)}
                                        Value={this.props.index.cin_enseignant}
                                        type="number"
                                        className="form-control"
                                        id="cin"
                                        placeholder="CIN"
                                    />
                                    <hr />
                                    <input
                                        ref={(val) => (this.tel_enseignant = val)}
                                        Value={this.props.index.tel_enseignant}
                                        type="number"
                                        className="form-control"
                                        id="tel"
                                        placeholder="Phone-number"
                                    />
                                    <hr />
                                    <input
                                        ref={(val) => (this.mail_enseignant = val)}
                                        Value={this.props.index.mail_enseignant}
                                        type="text"
                                        className="form-control"
                                        id="login"
                                        placeholder="Login"
                                        disabled />
                                    <hr />
                                    <input
                                        ref={(val) => (this.login_enseignant = val)}
                                        Value={this.props.index.login_enseignant}
                                        type="text"
                                        className="form-control"
                                        id="login"
                                        placeholder="Login"
                                        disabled
                                    />
                                    <hr />
                                    <Translate
                                        component="Butoon"
                                        content="btn_cancel"
                                        type="reset"
                                        class="btn btn-danger btnrt "
                                    >
                                    </Translate>
                                </div>
                            </form>
                            <Translate
                                component="Button"
                                content="btn_save"
                                type="submit"
                                className="btn btn-success btnrt margin_r_10"
                                onClick={this.updateteacher}
                            >
                            </Translate>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}
export default Teacherseditform;