import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Levelsgtab from "./Levelsgtab";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

class Levelsgform extends Component {
  placeholders = {
    nom: Counterpart.translate("prenom"),
    order: Counterpart.translate("order"),
  };
  raw = {
    id: "",
    nom: "",
    order: "",
  };
  //file upload
  //insert students
  insertlevelg = (event) => {
    console.log(this.levelname.value);
    if (this.levelname.value == "") {
      ReactDOM.render(
        <React.Fragment>
          <Alert variant="filled" severity="info">
            {Counterpart.translate("Please_fill_all_the_required_fields")}
          </Alert>
        </React.Fragment>,
        document.getElementById("alert")
      );
    }
    if (this.levelorder.value == "") {
      ReactDOM.render(
        <React.Fragment>
          <Alert variant="filled" severity="info">
            {Counterpart.translate("Please_fill_all_the_required_fields")}
          </Alert>
        </React.Fragment>,
        document.getElementById("alert")
      );
    } else {
      event.preventDefault();
      var posturl = Url.url + "Levels_g/addLevelg.php";
      axios
        .post(posturl,
          {
            levelg_name: this.levelname.value,
            levelg_order: this.levelorder.value,
          }
        )
        .then(
          function ({ data }) {
            console.log(data.var);
            this.levelname.value = "";
            this.levelorder.value = "";
            if (data.msg == "Level_g Inserted") {
              console.log(data.var);
              this.levelname.value = "";
              this.levelorder.value = "";
              ReactDOM.render(
                <React.Fragment>
                  <Levelsgtab state={this.props.state} />
                </React.Fragment>,
                document.getElementById("tttt")
              );
            }
            if (data.msg != "Level Inserted") {
              ReactDOM.render(
                <React.Fragment>
                  <Alert variant="filled" severity="info">
                    {Counterpart.translate("add_succ")}
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
            <Translate className="edit_subject_title"  content="add_level" component="h3" />
          </div>

          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" >
                <div class="form-group">
                  <input
                    ref={(val) => (this.levelname = val)}
                    type="text"
                    class="form-control"
                    placeholder={this.placeholders.nom}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.levelorder = val)}
                    type="number"
                    class="form-control"
                    placeholder={this.placeholders.order}
                  />
                  <hr />
                  <Translate
                    content="btn_cancel"
                    component="button"
                    type="reset"
                    className="btn btn-danger btnrt Subject_cancel_btn"
                  />
                </div>
              </form>
              <Translate
                content="btn_save"
                type="submit"
                component="button"
                class="btn btn-success btnrt margin_r_10 Subject_save_btn"
                onClick={this.insertlevelg}
              />
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Levelsgform;
