import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../api/Apiurl";
import Subjectfrom from "./Subjectsgform";
import Subjectsgtab from "./Subjectsgtab";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Levelgdetails from "./Levelgdetails";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import Close_button from './../../Close_button';
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

class Subjectsgupdateform extends Component {

  placeholders = {
    nom: Counterpart.translate("prenom"),
    order: Counterpart.translate("order"),
  };
  raw = {
    id: "",
    nom: "",
    order: "",
  };
  state = {
    row_level: []
  };
  state = this.props.state;

  //insert students
  updateSuvjectg = (event) => {
    console.log(this.props.row.id_matiere);
    var posturl = Url.url + "Levels_g/updateSubectg.php";
    event.preventDefault();
    console.log(this.props);

    axios.post(posturl,
      {
        subject_id: this.props.row.id_matiere,
        subject_name: this.subject_name.value
      }
    )
      .then(
        function ({ data }) {
          this.subject_name.value = "";
          console.log(data);
          console.log("to send", this.props.state.row_level);
          ReactDOM.render(
            <Subjectfrom state={this.props.state} />,
            document.getElementById("add_form")
          );
          ReactDOM.render(
            <Subjectsgtab state={this.props.state} />,
            document.getElementById("subjects_g_table")
          );
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  };
  row_level = this.props.state;
  //id_handler
  //RENDER
  render() {
    console.log("to send", this.props.state);
    console.log("props", this.state);
    return (
      <React.Fragment>
        <div
          className="card text-white  studentform mb-3 shdw color-darblue "
          id="title"
        >
          <span className="margin_top_5px"  
          onClick={() =>
                  ReactDOM.render(
                    <React.Fragment>
                      <Subjectfrom state={this.row_level} />
                    </React.Fragment>,
                    document.getElementById("add_form")
                  )}>
                        <Close_button />
                    </span>
          <div className="card-header" id="title">
            <Translate className="edit_subject_title"  content="update_subject" component="h3" />
          </div>
          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" onSubmit={this.updateSuvjectg}>
                <div class="form-group">
                  <input
                    ref={(val) => (this.subject_name = val)}
                    type="text"
                    Value={this.props.row.nom_matiere}
                    onChange={() => {
                      this.setState({ nom_matiere: this.subject_name.value });
                      console.log(this.state.nom_matiere)
                    }}
                    class="form-control"

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

export default Subjectsgupdateform;
