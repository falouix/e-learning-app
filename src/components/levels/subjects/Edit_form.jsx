import React, { Component } from "react";
import Axios, { post } from "axios";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Url from "../../../api/Apiurl";
import Close_button from './../../../Close_button';
import Level_subject_tab from './Level_subject_tab';
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Level_subject_form from "./Level_subject_form";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class Edit_form extends Component {
  placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
  };
  state = {
    id: "",
    nom: "",
    teacher: ""
  };
  row = {};
  //update subject
  updatesubject = (event) => {
    console.log("level id to edit from edit form", this.props);
    console.log(this.teacherid.value);
    console.log("subject id", this.subjectname.value);
    console.log(this.props.row);
    console.log(this.props.row.id_matiere);
    if (this.props.row.id_matiere_enseignant == null) {
      var posturl = Url.url + "Levels/Subjects/insert_teacher_Subjects.php";
      console.log("insert");
      Axios.post(posturl, {
        id_subject: this.props.row.id_matiere,
        id_teacher: this.teacherid.value,
        id_level: this.props.state.row_level.row.id_niveau
      })
        .then((res) => {
          ReactDOM.render(
            <Level_subject_tab state={this.props.state} />,
            document.getElementById("tab_edit_subject")
          );
        });
    } else {
      var posturl = Url.url + "Levels/Subjects/updateSubjects.php";
      Axios.post(posturl, {
        id_matiere_enseignant: this.props.row.id_matiere_enseignant,
        id_teacher: this.teacherid.value,
        id_subject: this.props.row.id_matiere,
        id_level: this.props.state.id_niveau
      })
        .then((res) => {
          console.log(res);
          ReactDOM.render(
            <Level_subject_tab state={this.props.state} />,
            document.getElementById("tab_edit_subject")
          );
        });
    }
  }
  //RENDER
  render() {
    var posturl = Url.url + "Teachers/getTeachers.php";
    //get teachers
    Axios
      .get(posturl)
      .then((res) => {
        console.log("teachers to select from", res.data);
        const teachers_list = res.data.teachers.map((item, index) => {
          console.log(item);
          if (this.props.row.id_enseignant == item.id_enseignant) {
            return (
              <option className="bckgr" value={item.id_enseignant} key={index} selected>
                {item.nom_enseignant}  {item.prenom_enseignant}
              </option>
            );
          } else {
            return (
              <option value={item.id_enseignant} key={index} >
                {item.nom_enseignant}  {item.prenom_enseignant}
              </option>
            );
          }
        });
        ReactDOM.render(
          <React.Fragment>
            <select
              class="custom-select  input-tex_diwabled"
              ref={(val) => (this.teacherid = val)}
              id="levels_list"
              onChange={() => { console.log(this.teacherid.value) }}
            >
              {teachers_list}
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
      <span className="margin_top_5px" onClick={() =>
                                    ReactDOM.render(
                                        <React.Fragment>
                                            <Level_subject_form state={this.props.state} />
                                        </React.Fragment>,
                                        document.getElementById("form_edit_subject")
                                    )
                                }>
<Close_button /></span>
        <div className="card-header" id="title">
          <Translate className="edit_subject_title" content="update_subject" component="h3" />
        </div>
        
        <div class="card-body">
          <div>
            <form >
              <div class="form-group">
                <Translate className="Subject_form_label" content="subject" component="label" />
                <input
                  type="text"
                  class="form-control input-tex_diwabled"
                  id="mail"
                  ref={(val) => (this.subjectname = val)}
                  onChange={() => {
                    console.log(this.subjectname.value);
                  }}
                  value={this.props.row.nom_matiere}
                  disabled />
                  <Translate className="Subject_form_label" content="teacher" component="label" />
                <div id="teachers_list">
                </div>
                <hr/>
                <Translate
                  content="btn_cancel"
                  component="button"
                  type="reset"
                  className="btn btn-danger btnrt Subject_cancel_btn"
                  onClick={() => { this.state.nom = this.subjectname.value; console.log(this.state.nom); }}
                />
              </div>
            </form>
            <Translate
              content="btn_save" 
              component="button"
              class="btn btn-success btnrt margin_r_10 Subject_save_btn"
              onClick={() => { this.updatesubject() }}
            />
          </div>
          
        </div>
      </div>);
  }
}
export default Edit_form;
