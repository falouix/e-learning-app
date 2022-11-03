import React, { useState, sessionStorage } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Inscrit_success from "./Inscrit_success";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import { BiXCircle } from "react-icons/bi";
import "../../App.css";
import "./Login.css";
import Counterpart from "counterpart";
class CreateCompte extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      file: "",
      selectedFile: null,
    };
  }
  fileSelect = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files });
    this.setState({ file: URL.createObjectURL(event.target.files[0]) });
  };

  handleValidation() {
    var formIsValid = false;
    console.log(this.prenom_etudiant.value);
    if (
      this.nom_etudiant.value == "" ||
      this.prenom_etudiant.value == "" ||
      this.cin_etudiant.value == "" ||
      this.tel_etudiant.value == "" ||
      this.mail_etudiant.value == "" ||
      this.pass_etudiant.value == "" ||
      this.login_etudiant.value == ""
    ) {
      ReactDOM.render(
        <>{Counterpart.translate("Please_fill_all_the_required_fields")}</>,
        document.getElementById("alert_inscrit")
      );
      formIsValid = false;
    } else {
      formIsValid = true;
    }

    return formIsValid;
  }

  contactSubmit() {
    console.log(this.avatar.value);
    if (this.handleValidation()) {
      // Create an object of formData
      const formData = new FormData();
      // Update the formData object
      formData.append(
        "avatar",
        this.state.selectedFile[0],
        this.state.selectedFile.name
      );
      axios
        .post(
          "https://uism-tn.com/api/InscriptEtu.php?login_etudiant=" +
            this.state.fields.login_etudiant +
            "&nom_etudiant=" +
            this.state.fields.nom_etudiant +
            "&prenom_etudiant=" +
            this.state.fields.prenom_etudiant +
            "&pass_etudiant=" +
            this.state.fields.pass_etudiant +
            "&cin_etudiant=" +
            this.state.fields.cin_etudiant +
            "&tel_etudiant=" +
            this.state.fields.tel_etudiant +
            "&mail_etudiant=" +
            this.state.fields.mail_etudiant,
          formData
        )
        .then(function (response) {
          console.log(response);
          if (response.data.msg == "Email already exist") {
            ReactDOM.render(
              <>{Counterpart.translate("Email_already_Address")}</>,
              document.getElementById("alert_inscrit")
            );
          }
          if (response.data.msg == "Login already exist") {
            ReactDOM.render(
              <>{Counterpart.translate("Login_already_exist")}</>,
              document.getElementById("alert_inscrit")
            );
          }
          if (response.data.msg == "User Inserted.") {
            ReactDOM.render(
              <React.StrictMode>
                <Inscrit_success />
              </React.StrictMode>,
              document.getElementById("root")
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div className="div_login container-fluid d-flex align-items-center justify-content-center">
        <div className="form_container2">
          <img src="https://uism-tn.com/api/login-logo.png" />
          <hr className="h1-login margin_top-2-margin_bottom-6" />
          <h1 className="h1-login margin_top-0-margin_bottom--5 ">
            {Counterpart.translate("Inscription_Form")}
          </h1>
          <hr className="h1-login margin_top-2-margin_bottom-6" />
          <div id="alert_inscrit"></div>
          <form
            name="contactform"
            className="contactform"
            noValidate
            autoComplete="off"
            onSubmit={this.contactSubmit.bind(this)}
          >
            <div className="header"></div>
            <div className="col-6 inpu_forms">
              <div className="form-group">
                <label
                  htmlFor="inputForUsername flt_right"
                  className="flt_right"
                >
                  {Counterpart.translate("avatar")}
                </label>
                <span className="mandatory flt_right">*</span>
                <input
                  className="form-control iput_inscrit"
                  ref={(val) => (this.avatar = val)}
                  type="file"
                  onChange={this.fileSelect}
                  value={this.state.fields["avatar"]}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["avatar"]}
                </span>
              </div>
              <div className="form-group">
                <label
                  htmlFor="inputForUsername flt_right"
                  className="flt_right"
                >
                  {Counterpart.translate("login")}
                </label>
                <span className="mandatory flt_right">*</span>
                <input
                  className="form-control iput_inscrit"
                  ref={(val) => (this.login_etudiant = val)}
                  type="text"
                  size="30"
                  placeholder="Username"
                  onChange={this.handleChange.bind(this, "login_etudiant")}
                  value={this.state.fields["login_etudiant"]}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["login_etudiant"]}
                </span>
              </div>
              <div className="form-group">
                <label
                  htmlFor="inputForUsername flt_right"
                  className="flt_right"
                >
                  {Counterpart.translate("Name")}
                </label>
                <span className="mandatory flt_right">*</span>
                <input
                  className="form-control iput_inscrit"
                  ref={(val) => (this.nom_etudiant = val)}
                  //ref="nom_etudiant"
                  type="text"
                  size="30"
                  placeholder="Nom"
                  onChange={this.handleChange.bind(this, "nom_etudiant")}
                  value={this.state.fields["nom_etudiant"]}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["nom_etudiant"]}
                </span>
              </div>
              <div className="form-group">
                <label
                  htmlFor="inputForUsername flt_right"
                  className="flt_right"
                >
                  {Counterpart.translate("prenom")}
                </label>
                <span className="mandatory flt_right">*</span>
                <input
                  className="form-control iput_inscrit"
                  ref={(val) => (this.prenom_etudiant = val)}
                  type="text"
                  size="30"
                  placeholder="Prenom"
                  onChange={this.handleChange.bind(this, "prenom_etudiant")}
                  value={this.state.fields["prenom_etudiant"]}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["prenom_etudiant"]}
                </span>
              </div>
            </div>
            <div className="col-6 inpu_forms ">
              <div className="form-group">
                <label
                  htmlFor="inputForUsername flt_right"
                  className="flt_right"
                >
                  {Counterpart.translate("mail")}
                </label>
                <span className="mandatory flt_right">*</span>
                <input
                  className="form-control iput_inscrit"
                  ref={(val) => (this.mail_etudiant = val)}
                  refs="mail_etudiant"
                  type="text"
                  size="30"
                  placeholder="Email"
                  onChange={this.handleChange.bind(this, "mail_etudiant")}
                  value={this.state.fields["mail_etudiant"]}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["mail_etudiant"]}
                </span>
              </div>
              <div className="form-group">
                <label
                  htmlFor="inputForUsername flt_right"
                  className="flt_right"
                >
                  {Counterpart.translate("cin")}
                </label>
                <span className="mandatory flt_right">*</span>
                <input
                  className="form-control iput_inscrit"
                  ref={(val) => (this.cin_etudiant = val)}
                  refs="cin_etudiant"
                  type="number"
                  size="8"
                  minLength="8"
                  maxLength="8"
                  placeholder="CIN"
                  onChange={this.handleChange.bind(this, "cin_etudiant")}
                  value={this.state.fields["cin_etudiant"]}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["cin_etudiant"]}
                </span>
              </div>
              <div className="form-group">
                <label
                  htmlFor="inputForUsername flt_right"
                  className="flt_right"
                >
                  {Counterpart.translate("tel")}
                </label>
                <span className="mandatory flt_right">*</span>
                <input
                  className="form-control iput_inscrit"
                  ref={(val) => (this.tel_etudiant = val)}
                  refs="tel_etudiant"
                  type="number"
                  size="30"
                  placeholder="Phone"
                  onChange={this.handleChange.bind(this, "tel_etudiant")}
                  value={this.state.fields["tel_etudiant"]}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["tel_etudiant"]}
                </span>
              </div>
              <div className="form-group">
                <div className="flt_right">
                  <label htmlFor="inputForUsername flt_right">
                    {Counterpart.translate("pass_word")}
                  </label>
                </div>
                <span className="mandatory flt_right">*</span>
                <input
                  className="form-control iput_inscrit"
                  //ref="pass_etudiant"
                  ref={(val) => (this.pass_etudiant = val)}
                  type="password"
                  size="30"
                  placeholder="Password"
                  onChange={this.handleChange.bind(this, "pass_etudiant")}
                  value={this.state.fields["pass_etudiant"]}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["pass_etudiant"]}
                </span>
              </div>
            </div>
          </form>
          <button
            onClick={() => {
              this.contactSubmit();
            }}
            size="lg"
            className="btn btn-outline-primary"
          >
            Envoyer
          </button>

          <hr className="h1-login margin_top-2-margin_bottom-6" />
          <h1 className="h1-login margin_top-0-margin_bottom--5 ">
            الرجاء تعبئة كل ما هو مطلوب
          </h1>
          <hr className="h1-login margin_top-2-margin_bottom-6" />
          <a
            onClick={() => {
              window.location.reload();
            }}
            className="a_back_inscrit"
          >
            Back
          </a>
        </div>
      </div>
    );
  }
}

export default CreateCompte;
