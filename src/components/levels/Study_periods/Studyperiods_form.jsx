import React, { Component } from "react";
import Axios, { post } from "axios";
import Url from "../../../api/Apiurl";
import Alert from "@material-ui/lab/Alert";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Levelstab from "../Levelstab";
import Button from "react-bootstrap/Button";
import Studyperiods_tab from "./Studyperiods_tab";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

class Studyperiods_form extends Component {
  placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
  };
  state = {
    id: "",
    Starting: "",
    Ending: "",
    Periods: [],
  };
  row = {};
  checkperiod() {
    var bool = "true";
    this.state.Periods.forEach(item => {
      if ((this.state.Starting <= item.datef_periode_etude) && (this.state.Starting >= item.dated_periode_etude)) {
        bool = "false";
      }
      if ((this.state.Ending <= item.datef_periode_etude) && (this.state.Ending >= item.dated_periode_etude)) {
        bool = "false";
      }
    });
    return (bool);
  }
  //update subject
  insertperiod = (event) => {
    var posturl1 = Url.url + "Levels/Study_periods/addStudy_periods.php";
    if ((this.state.Starting == "") || (this.state.Starting == "")) {
      ReactDOM.render(
        <Alert variant="filled" severity="error">{Counterpart.translate("period_fail2")}</Alert >,
        document.getElementById("alert")
      );
    }
    if (this.state.Starting < this.state.Ending) {
      if (this.checkperiod() == "true") {
        console.log("insert");
        Axios.post(posturl1, {
          Starting: this.state.Starting,
          Ending: this.state.Ending,
          id_niveau: this.props.id
        })
          .then((res) => {
            ReactDOM.render(
              <Studyperiods_tab id={this.props.id} />,
              document.getElementById("Studyperiods_tab")
            );
            ReactDOM.render(
              <Alert variant="filled" severity="info">{Counterpart.translate("add_succ")}</Alert >,
              document.getElementById("alert")
            );


          });
      }
    }
    if (this.checkperiod() == "false") {
      ReactDOM.render(
        <Alert variant="filled" severity="error">{Counterpart.translate("period_fail3")}</Alert >,
        document.getElementById("alert")
      );

    }
    if (this.state.Starting >= this.state.Ending) {

      ReactDOM.render(
        <Alert variant="filled" severity="error">{Counterpart.translate("period_fail1")}</Alert >,
        document.getElementById("alert")
      );
    }

  }


  render() {
    var posturl = Url.url + "Levels/Study_periods/getStudy_periods.php";
    Axios
      .post(posturl, {
        level_id: this.props.id
      }
      )
      .then((res) => {
        this.state.Periods = res.data.Periods;
      });
    console.log("edit form row local", this.props.row);
    return (
      <div
        className="card text-white  studentform mb-3 shdw color-darblue"
        id="title"
      >
        <div className="card-header" id="title">
          <h3><Translate className="edit_subject_title"  content="add_period" component="h3" /></h3>
        </div>
        <div id="alert"></div>
        <div class="card-body">
          <div>
            <form >
              <div class="form-group">
                <label><Translate content="date_deb" component="h3" /></label>
                <input

                  type="date"
                  class="form-control"
                  ref={(val) => (this.Starting = val)}
                  onChange={() => {
                    this.state.Starting = this.Starting.value;

                  }
                  }
                  Value={this.props.row.nom_matiere}
                />
                <hr />
                <label><Translate content="date_fin" component="h3" /></label>
                <input

                  type="date"
                  class="form-control"
                  ref={(val) => (this.Ending = val)}
                  onChange={() => {
                    this.state.Ending = this.Ending.value;
                  }
                  }
                  Value={this.props.row.nom_matiere}
                />
                <hr />
                <Translate
                  content="btn_cancel"
                  component="button"
                  type="reset"
                  className="btn btn-danger btnrt"

                />

              </div>
            </form>
            <Translate
              content="btn_save"

              component="button"
              class="btn btn-success btnrt margin_r_10"
              onClick={this.insertperiod}
            />
          </div>
        </div>
      </div>);
  }
}

export default Studyperiods_form;
