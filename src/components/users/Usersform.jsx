import React, { Component } from "react";
import axios, { post } from "axios";
import "./assets/css/Users.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Userstab from "./Userstab";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
import Url from "../../api/Apiurl";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);

class Usersform extends Component {
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
  renderform(data) {
    //sen request

    ReactDOM.render(
      <React.Fragment>
        <div
          className="card text-white  userform mb-3 shdw color-darblue"
          id="title"
        >
          <div className="card-header" id="title">
            <Translate className="edit_subject_title"  content="head_title" component="h3" />
          </div>
          <div id="alert">
            <Alert variant="filled" severity="info">
              {Counterpart.translate("add_succ")}
            </Alert>
          </div>

          <div class="card-body">
            <div>
              <form onSubmit={this.insertUser}>
                <div class="form-group">
                  <input
                    ref={(val) => (this.username = val)}
                    type="text"
                    class="form-control"
                    placeholder={this.placeholders.nom}
                  />

                  <hr />
                  <input
                    ref={(val) => (this.userprenom = val)}
                    type="text"
                    class="form-control"
                    id="prenom"
                    placeholder={this.placeholders.prenom}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.usercin = val)}
                    type="number"
                    className="form-control"
                    id="cin"
                    placeholder={this.placeholders.cin}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.usertel = val)}
                    type="number"
                    className="form-control"
                    id="tel"
                    placeholder={this.placeholders.tel}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.usermail = val)}
                    type="text"
                    class="form-control"
                    id="mail"
                    placeholder={this.placeholders.mail}

                  />
                  <hr />
                  <input
                    ref={(val) => (this.userlogin = val)}
                    type="text"
                    class="form-control"
                    id="login"
                    placeholder={this.placeholders.login}

                  />
                  <hr />
                  <select
                    class="custom-select"
                    ref={(val) => (this.userrool = val)}
                    required
                  >
                    <Translate
                      component="option"
                      value="2"
                      type="text"
                      content="rool2"
                    />
                    <Translate
                      component="option"
                      value="1"
                      type="text"
                      content="rool1"
                    />
                  </select>
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
            </div>
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("editForm")
    );
  }

  //insert users
  insertUser = (event) => {
    event.preventDefault();
    var posturl = Url.url + "Users/addUsers.php";

    axios
      .post(posturl, {
        user_name: this.username.value,
        user_prenom: this.userprenom.value,
        user_cin: this.usercin.value,
        user_tel: this.usertel.value,
        user_email: this.usermail.value,
        user_login: this.userlogin.value,
        user_rool: this.userrool.value,
      })
      .then(
        function ({ data }) {
          console.log(data.msg);

          if (data.msg == "User Inserted.") {
            console.log("true");

            this.username.value = "";
            this.userprenom.value = "";
            this.usercin.value = "";
            this.usertel.value = "";
            this.usermail.value = "";
            this.userlogin.value = "";
            this.renderform(data);
            ReactDOM.render(
              <React.Fragment>
                <Userstab state={this.props.state} />
              </React.Fragment>,
              document.getElementById("userstab")
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
          } if (data.msg == "User Not Inserted!") {

            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("add_err")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          }
          if (data.msg == "CIN already exist") {

            ReactDOM.render(
              <React.Fragment>
                <Alert variant="filled" severity="error">
                  {Counterpart.translate("Cin_already_exist")}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
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
          else if (data.msg == "Invalid Email Address!") {
            console.log(Counterpart.translate("Invalid_Email_Address"));
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
          }
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <React.Fragment>
        <div
          className="card text-white  userform mb-3 shdw color-darblue "
          id="title"
        >
          <div className="card-header" id="title">
            <Translate className="edit_subject_title" content="add_user" component="h3" />
          </div>

          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" onSubmit={this.insertUser}>
                <div class="form-group">
                  <input
                    ref={(val) => (this.username = val)}
                    type="text"
                    class="form-control"
                    placeholder={this.placeholders.nom}
                  />

                  <hr />
                  <input
                    ref={(val) => (this.userprenom = val)}
                    type="text"
                    class="form-control"
                    id="prenom"
                    placeholder={this.placeholders.prenom}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.usercin = val)}
                    type="number"
                    className="form-control"
                    id="cin"
                    placeholder={this.placeholders.cin}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.usertel = val)}
                    type="number"
                    className="form-control"
                    id="tel"
                    placeholder={this.placeholders.tel}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.usermail = val)}
                    type="text"
                    class="form-control"
                    id="mail"
                    placeholder={this.placeholders.mail}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.userlogin = val)}
                    type="text"
                    class="form-control"
                    id="login"
                    placeholder={this.placeholders.login}
                  />
                  <hr />
                  <select
                    class="custom-select"
                    ref={(val) => (this.userrool = val)}
                    required
                  >
                    <Translate
                      component="option"
                      value="2"
                      type="text"
                      content="rool2"
                    />
                    <Translate
                      component="option"
                      value="1"
                      type="text"
                      content="rool1"
                    />
                  </select>
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

export default Usersform;
