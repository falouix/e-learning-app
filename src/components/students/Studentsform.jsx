import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Studentstab from "./Studentstab";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class Studentsform extends Component {
  //get level
  levels = [{ level: "" }];
  //place holders values
  placeholders = {
    nom: Counterpart.translate("Name"),
    prenom: Counterpart.translate("prenom"),
    mail: Counterpart.translate("mail"),
    login: Counterpart.translate("login"),
    tel: Counterpart.translate("tel"),
    cin: Counterpart.translate("cin"),
    level: Counterpart.translate("level"),
  };
  //row
  raw = {
    id: "",
    nom: "",
    prenom: "",
    cin: "",
    tel: "",
    mail: "",
    login: "",
    status: "",
  };
  //insert students
  insertstudent = (event) => {
    event.preventDefault();
    var posturl = Url.url + "Students/addStudent.php";
    axios
      .post(posturl,
        {
          student_name: this.studentname.value,
          student_prenom: this.studentprenom.value,
          student_cin: this.studentcin.value,
          student_tel: this.studenttel.value,
          student_email: this.studentmail.value,
          student_login: this.studentlogin.value,
          student_level: this.studentlevel.value,
        }
      )
      .then(
        function ({ data }) {
          console.log(data.msg);
          if (data.msg == "student Inserted") {
            console.log("true");
            ReactDOM.render(
              <React.Fragment>
                <Studentstab state={this.props.state} />
              </React.Fragment>,
              document.getElementById("Studentstab")
            );
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="info">
                  {Counterpart.translate("add_succ")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
            this.studentname.value = "";
            this.studentprenom.value = "";
            this.studentcin.value = "";
            this.studenttel.value = "";
            this.studentmail.value = "";
            this.studentlogin.value = "";
          }
          if (data.msg == "Login already exist") {
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("Login_already_exist")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          }
          if (data.msg == "Phone number already exist") {
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("phone_number_exist")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          }
          if (data.msg == "Please fill all the required fields!") {
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("Please_fill_all_the_required_fields")}
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
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  };
  //id_handler
  //RENDER
  render() {
    var posturl = Url.url + "Students/getLevels.php";
    axios
      .get(posturl)
      .then((res) => {
        console.log("all levels form", res.data.Levels);
        const level_list = res.data.Levels.map((item, index) => {
          console.log(item);
          return (
            <option value={item.id_niveau} key={index}>
              {item.nom_niveau_g}
            </option>
          );
        });
        ReactDOM.render(
          <React.Fragment>
            <select
              class="custom-select"
              ref={(val) => (this.studentlevel = val)}
              id="levels_list"
              required
              onChange={() => { console.log(this.studentlevel.value) }}
            >
              {level_list}
            </select>
          </React.Fragment>,
          document.getElementById("levels_list")
        );
      });
    return (
      <React.Fragment>
        <div
          className="card text-white  studentform mb-3 shdw color-darblue "
          id="title"
        >
          <div className="card-header" id="title">
            <Translate className="edit_subject_title"  content="head_title" component="h3" />
          </div>

          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" onSubmit={this.insertstudent}>
                <div class="form-group">
                  <input
                    ref={(val) => (this.studentname = val)}
                    type="text"
                    class="form-control"
                    placeholder={this.placeholders.nom}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studentprenom = val)}
                    type="text"
                    class="form-control"
                    id="prenom"
                    placeholder={this.placeholders.prenom}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studentcin = val)}
                    type="number"
                    className="form-control"
                    id="cin"
                    placeholder={this.placeholders.cin}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studenttel = val)}
                    type="number"
                    className="form-control"
                    id="tel"
                    placeholder={this.placeholders.tel}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studentmail = val)}
                    type="text"
                    class="form-control"
                    id="mail"
                    placeholder={this.placeholders.mail}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studentlogin = val)}
                    type="text"
                    class="form-control"
                    id="login"
                    placeholder={this.placeholders.login}
                  />
                  <hr />
                  <div id="levels_list"></div>
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
export default Studentsform;
