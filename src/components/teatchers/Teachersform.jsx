import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Teacherstab from "./Teacherstab";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

class Teatchersform extends Component {
  placeholders = {
    nom: Counterpart.translate("Name"),
    prenom: Counterpart.translate("prenom"),
    mail: Counterpart.translate("mail"),
    login: Counterpart.translate("login"),
    tel: Counterpart.translate("tel"),
    cin: Counterpart.translate("cin"),
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
  //file upload

  //rerender form


  //insert enseignants
  insertTeacher = (event) => {
    event.preventDefault();
    var posturl = Url.url + "Teachers/addTeacher.php";
    axios
      .post(posturl,
        {
          enseignant_name: this.enseignantname.value,
          enseignant_prenom: this.enseignantprenom.value,
          enseignant_cin: this.enseignantcin.value,
          enseignant_tel: this.enseignanttel.value,
          enseignant_email: this.enseignantmail.value,
          enseignant_login: this.enseignantlogin.value,
        }
      )
      .then(
        function ({ data }) {
          console.log(data);
          if (data.msg == "Teacher Inserted") {
            console.log("true");
            this.enseignantname.value = "";
            this.enseignantprenom.value = "";
            this.enseignantcin.value = "";
            this.enseignanttel.value = "";
            this.enseignantmail.value = "";
            this.enseignantlogin.value = "";
            ReactDOM.render(
              <React.Fragment>
                <Teacherstab state={this.props.state} />
              </React.Fragment>,
              document.getElementById("tttt")
            );
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="info">
                  {Counterpart.translate("add_succ")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          }
          if (data.msg == "Email already exist") {

            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("Email_already_Address")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          }
          if (data.msg == "enseignant Not Inserted!") {

            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("add_err")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          } else if (data.msg == "Invalid Email Address!") {
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("Invalid_Email_Address")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );

          } else if (data.msg == "Please fill all the required fields!") {

            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("Please_fill_all_the_required_fields")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          }else if (data.msg == "tel already exist") {

            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("phone_number_exist")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          } else if (data.msg == "Cin already exist") {

            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("Cin_already_exist")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          } else if (data.msg == "Login already exist") {
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("Login_already_exist")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          }
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  //id_handler

  //RENDER

  render() {
    return (
      <React.Fragment>
        <div
          className="card text-white  enseignantform mb-3 shdw color-darblue "
          id="title"
        >
          <div className="card-header" id="title">
            <Translate className="edit_subject_title" content="head_title" component="h3" />
          </div>

          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" onSubmit={this.insertTeacher}>
                <div class="form-group">
                  <input
                    ref={(val) => (this.enseignantname = val)}
                    type="text"
                    class="form-control"
                    placeholder={this.placeholders.nom}
                  />

                  <hr />
                  <input
                    ref={(val) => (this.enseignantprenom = val)}
                    type="text"
                    class="form-control"
                    id="prenom"
                    placeholder={this.placeholders.prenom}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.enseignantcin = val)}
                    type="number"
                    className="form-control"
                    id="cin"
                    placeholder={this.placeholders.cin}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.enseignanttel = val)}
                    type="number"
                    className="form-control"
                    id="tel"
                    placeholder={this.placeholders.tel}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.enseignantmail = val)}
                    type="text"
                    class="form-control"
                    id="mail"
                    placeholder={this.placeholders.mail}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.enseignantlogin = val)}
                    type="text"
                    class="form-control"
                    id="login"
                    placeholder={this.placeholders.login}
                  />
                  <hr />
                  <Translate
                    content="btn_cancel"
                    component="button"
                    type="reset"
                    className="btn btn-danger btnrt Subject_cancel_btn"
                  />
                  <Translate
                    content="btn_save"
                    type="submit"
                    component="button"
                    class="btn btn-success btnrt margin_r_10 Subject_save_btn"
                  />
                </div>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Teatchersform;
