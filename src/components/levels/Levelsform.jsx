import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Levelstab from "./Levelstab";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class Levelsform extends Component {

  orders = <option></option>;
  //file upload
  //rerender form
  /* showyear() {
     console.log(this.levelyear.value);
   }*/
  //insert students
  insertlevel = (event) => {
    if (this.levelorder.value == "الترتيب الدراسي") {
      ReactDOM.render(
        <React.Fragment>
          <Alert variant="filled" severity="error">
            {Counterpart.translate("choose_order")}
          </Alert>
        </React.Fragment>,
        document.getElementById("alert")
      );
    } else {
      var posturl = Url.url + "Levels/addLevel.php";
      event.preventDefault();
      axios
        .post(posturl,
          {
            level_order: this.levelorder.value,
            level_semester: this.levelsemester.value,
            level_year: this.levelyear.value
          }
        )
        .then(
          function ({ data }) {
            if (data.msg == "level Inserted") {
              ReactDOM.render(
                <React.Fragment>
                  <Levelstab state={this.props.state} />
                </React.Fragment>,
                document.getElementById("tttt")
              );
            }
            if (data.msg != "level Inserted") {
              ReactDOM.render(
                <React.Fragment>
                  <Alert variant="filled" severity="error">
                    {data.msg}
                  </Alert>
                </React.Fragment>,
                document.getElementById("alert")
              );
            }
          }.bind(this)
        )
        .catch(function (error) {
        });
    }
  };
  //id_handler
  //RENDER
  render() {
    let y = 2000;
    let years = [];
    for (var i = 0; i < 50; i++) {
      let x = y + "/" + (y + 1)
      years.push(x);
      y++;
    }
    var posturl = Url.url + "Levels_g/getLevels_g.php";
    axios
      .get(posturl)
      .then((res) => {
        this.orders = res.data.Levels_g.map((item, index) => {
          return (
            <option value={item.id_niveau_g} key={index}>
              {item.nom_niveau_g}
            </option>
          )
        });
        ReactDOM.render(
          <select class="form-control"
            ref={(val) => (this.levelorder = val)}
          >
            {this.orders}
          </select>,
          document.getElementById("orders")
        );
      }
      );
    return (
      <React.Fragment>
        <div
          className="card text-white  studentform mb-3 shdw color-darblue "
          id="title"
        >
          <div className="card-header" id="title">
            <Translate className="edit_subject_title text_align" content="add_level" component="h3" />
          </div>

          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" >
                <div class="form-group">
                  <label style={{ float: "right" }}>{Counterpart.translate("scholar_year")}</label>
                  <select
                    ref={(val) => (this.levelyear = val)}
                    type="text"
                    class="form-control"
                  >
                    {years.map((index, key) =>
                      <option
                        value={index}
                      >
                        {index}
                      </option>
                    )};
                  </select>
                  <hr />
                  <label style={{ float: "right" }}>{Counterpart.translate("semester")}</label>
                  <select
                    ref={(val) => (this.levelsemester = val)}
                    type="text"
                    class="form-control"
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                  </select>
                  <hr />
                  <label style={{ float: "right" }}>{Counterpart.translate("level")}</label>
                  <div id="orders">
                  </div>

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
                onClick={this.insertlevel}
                component="button"
                class="btn btn-success btnrt margin_r_10 Subject_save_btn"
              />
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }
}

export default Levelsform;
