import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Subjectsgtab from "./Subjectsgtab";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

class Subjectsgform extends Component {
  placeholders = {
    nom: Counterpart.translate("prenom"),
    order: Counterpart.translate("order"),
  };
  raw = {
    id: "",
    nom: "",
    order: "",
  };

  //insert students
  insertsubjectg = (event) => {
    event.preventDefault();
    console.log(this.props.state.row_level.id_niveau_g);
    console.log(this.subject_name.value);
    var posturl = Url.url + "Levels_g/addSubecjtg.php";
    if (this.subject_name.value != "") {
      axios.post(posturl,
        {
          id_niveau_g: this.props.state.row_level.id_niveau_g,
          subject_name: this.subject_name.value
        }
      )
        .then(
          function ({ data }) {
            this.subject_name.value = "";
            console.log(data);
            console.log("to send", this.props.state.row_level);
            ReactDOM.render(
              <Subjectsgtab state={this.props.state} />,
              document.getElementById("subjects_g_table")
            );
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      ReactDOM.render(
        <Alert variant="filled" severity="error">
          {Counterpart.translate("add_succ")}
        </Alert>,
        document.getElementById("Please_fill_all_the_required_fields")
      );
    }
  };

  //id_handler

  //RENDER

  render() {
    return (
      <React.Fragment>
        <div
          className="card text-white  studentform mb-3 shdw color-darblue "
          id="title"
        >
          <div className="card-header" id="title">
            <Translate className="edit_subject_title"  content="add_subject" component="h3" />
          </div>

          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" onSubmit={this.insertsubjectg}>
                <div class="form-group">
                  <input
                    ref={(val) => (this.subject_name = val)}
                    type="text"
                    class="form-control"
                    placeholder={this.placeholders.nom}
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

export default Subjectsgform;
