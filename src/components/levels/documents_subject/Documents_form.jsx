import React, { useState, Component } from "react";
import Documents_tab from "./Documents_tab";
import axios, { post } from "axios";
import Url from "../../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Documents_details from "./Documents_tab";
import { IoIosCloudUpload } from "react-icons/io";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class Documents_form extends Component {
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
  // On file upload (click the upload button) 
  insertdocument = () => {

    console.log("to send to tab", this.props);
    // Create an object of formData
    const user = JSON.parse(window.sessionStorage.getItem('session'));
    console.log((user).id_users);
    console.log(this.documentname.value);
    console.log("top second post", this.props.row.id_niveau)
    const formData = new FormData();
    if (this.state.selectedFile == null) {
      ReactDOM.render(
        <Alert variant="filled" severity="error">{Counterpart.translate("Please_fill_all_the_required_fields")}</Alert>,
        document.getElementById("alert")
      );
      console.log("state null", this.state)
    } else {
      console.log("after post", this.state.selectedFile.name);
      const realname = this.state.selectedFile.name
      // Update the formData object 
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      // Details of the uploaded file 
      console.log(this.state.selectedFile.name);
      // Request made to the backend api 
      // Send formData object 
      const name = this.documentname.value;
      const id_niveau = this.props.row.id_niveau;
      formData.append(
        "id_niveau",
        this.props.row.id_niveau
      );
      formData.append(
        "name",
        this.documentname.value
      );
      formData.append(
        "id_user",
        user.id_users
      );
      formData.append(
        "realname",
        realname
      );
      var posturl = Url.url + "Levels/Documents/uploadDocs.php";
      axios.post(posturl, formData
      ).then(function ({ data }) {
        console.log(data);

        if (data.success == '1' && data.msg != '') {
          ReactDOM.render(
            <React.Fragment>
              <Documents_details />
            </React.Fragment>,
            document.getElementById("tttt")
          );
        }
        /*   var posturl1 = Url.url + "Levels/Documents/addDocs.php";
           axios.post(posturl1,
             {
           }
           ).then(function ({ data }){
             console.log("insert to data base date bacck",data);
             
           }); */
      });
    }
    console.log("end of this function");
    console.log(this.props);

  };

  render() {
    return (
      <React.Fragment>
        <div
          className="card text-white  studentform mb-3 shdw color-darblue "
          id="title"
        >
          <div className="card-header" id="title">
            <Translate className="edit_subject_title"  content="add_document" component="h3" />
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
                  className="btn btn-danger btnrt Subject_cancel_btn"
                /></form>
              <button
                onClick={this.insertdocument}
                type="submit"
                component="button"
                class="btn btn-success btnrt margin_r_10 Subject_save_btn"
              >
                <Translate content="add_document" />
                <IoIosCloudUpload />

              </button>
              <hr />
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Documents_form;
