import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Level_subject_form from "./Level_subject_form";
import Level_subject_tab from "./Level_subject_tab";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class Level_add_form extends Component {
  placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
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
  //RENDER
  insertSubjject = (event) => {
    event.preventDefault();
    console.log(this.props.state);
    console.log(this.props.id_niveau);
    console.log(this.subjectteacher.value);
    if (this.props.state.id_niveau != null) {
      axios
        .post("https://uism-tn.com/api/Levels/Subjects/insert_teacher_Subjects.php", {
          prof: this.subjectteacher.value,
          id_niveau: this.props.state.id_niveau,
          id_matiere_ens: this.props.state.id_matiere_enseignant,
        })
        .then(
          function ({ data }) {

            if (data.msg == "Subject updated") {
              ReactDOM.render(
                <Level_subject_tab state={this.props.state} />,
                document.getElementById("tab_edit_subject")
              );
              ReactDOM.render(
                <React.Fragment>
                  <Alert severity="info">
                    {Counterpart.translate("add_succ")}
                  </Alert>
                </React.Fragment>,
                document.getElementById("alert")
              );
              /*  setTimeout(() => {
                  window.location.reload(false);
                }, 2000);*/
            } else {
              ReactDOM.render(
                <React.Fragment>
                  <Alert severity="error">
                    {Counterpart.translate("add_err")}
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



    } else {
      axios
        .post("https://uism-tn.com/api/Levels/Subjects/updateSubjects.php", {
          prof: this.subjectteacher.value,
          nom_matiere: this.props.state.nom_matiere,
          id_niveau_g: this.props.state.id_niveau_g,
          id_niveau: this.props.id_niveau,
          id_matiere_ens: this.props.state.id_matiere_enseignant,
        })
        .then(
          function ({ data }) {
            console.log("where am editing", data);
            if (data.msg == "Subject updated") {
              ReactDOM.render(
                <React.Fragment>
                  <Level_subject_tab state={this.props.state} />
                </React.Fragment>,
                document.getElementById("subjects_table")
              )
              ReactDOM.render(
                <React.Fragment>
                  <Alert severity="danger">
                    {Counterpart.translate("add_succ")}
                  </Alert>
                </React.Fragment>,
                document.getElementById("alert")
              );
            } else {
              ReactDOM.render(
                <React.Fragment>
                  <Alert severity="error">
                    {Counterpart.translate("add_err")}
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
    }
  };
  render() {
    axios
      .get(
        "https://uism-tn.com/api/Teachers/getTeachers.php"
      )
      .then((res) => {

        console.log(this.props.id_niveau);
        console.log("all teachers form", res.data.teachers.length);
        ReactDOM.render(
          <React.Fragment>
            <select
              className="custom-select  input-tex_diwabled"
              ref={(val) => (this.subjectteacher = val)}
              id="levels_list"
              required
            >
              {res.data.teachers.map((item, index) => {
                return (
                  <option value={item.id_enseignant} key={index}>
                    {item.nom_enseignant}
                  </option>
                );
              })}
            </select>
          </React.Fragment>,
          document.getElementById("teachers_list")
        );
      });
    return (
      <div
        className="card text-white pading-top-0  studentform mb-3 shdw color-darblue"
        id="title"
      >
        <div className="card-header" id="title">
          <Translate className="edit_subject_title" content="add_subject" component="h3" />
        </div>
        <div id="alert"></div>
        <div class="card-body">
          <div>
            <form onSubmit={this.insertSubjject} >
              <div class="form-group">
                <input
                  value={this.props.state.nom_matiere}
                  type="text"
                  class="form-control input-tex_diwabled"
                  id="subject_name"
                  placeholder={this.placeholders.subject}
                />
                <hr />
                <div id="teachers_list"></div>

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
    );
  }
}
export default Level_add_form;
