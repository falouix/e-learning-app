import React, { Component } from "react";
import Axios, { post } from "axios";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Url from "../../../api/Apiurl";
import Alert from "@material-ui/lab/Alert";
import Button from "react-bootstrap/Button";
import Weeklyschedule_tab from "./Weeklyschedule_tab";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
function getDaysBetweenDates(start, end, dayName) {
  var result = [];
  var days = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };
  var day = days[dayName];
  // Copy start date
  var current = new Date(start);
  // Shift to next of required days
  current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
  // While less than end date, add dates to result array
  while (current < end) {
    result.push(new Date(+current));
    current.setDate(current.getDate() + 7);
  }
  return result;
}

class Weeklyschedule_form extends Component {
  //Place holders translated
  placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
  };
  //this state
  state = {
    day: "0",
    Starting: "",
    Ending: "",
    id_me: "",
    Periods: [],
    classes_days_start: [],
    classes_days_end: [],
  };
  week_classes = {
    weeks: [],
  }
  seances = [];
  row = {};
  options_items = <optio></optio>;
  time_choice = "true";

  //Insert classes
  insertclass = (event) => {
    console.log(this.state.classes_days_start)
    //get all the week classes to compare
    var wks = [];
    var getWeeks = Url.url + "Levels/weekly_schedule/getWeeks.php";
    Axios
      .post(getWeeks,
        { level_id: this.props.id }
      )
      .then(({ data }) => {
        this.week_classes.weeks = data.Weeks;
        this.week_classes.weeks.forEach((item, index) => {
          if (item.jour_semaine == this.state.day) {
            if (
              ((item.debut_semaine < this.state.Starting) && (item.fin_semaine > this.state.Starting))
              || ((item.debut_semaine < this.state.Ending) && (item.fin_semaine > this.state.Ending))
              || ((item.debut_semaine >= this.state.Starting) && (item.fin_semaine <= this.state.Ending))
              || ((item.debut_semaine <= this.state.Starting) && (item.fin_semaine >= this.state.Ending))
            ) {
              this.time_choice = "false";
            }
          }
        });
        if (this.time_choice == "true") {
          if ((this.Starting.value == "") || (this.Ending.value == "")) {
            ReactDOM.render(
              <Alert variant="filled" severity="error">{Counterpart.translate("Please_fill_all_the_required_fields")}</Alert >,
              document.getElementById("alert")
            );
          }
          if ((this.Starting.value >= this.Ending.value)) {
            ReactDOM.render(
              <Alert variant="filled" severity="error">{Counterpart.translate("week_add_fail1")}</Alert >,
              document.getElementById("alert")
            );
          } else {
            ReactDOM.render(
              <Alert variant="filled" severity="info">{Counterpart.translate("add_succ")}</Alert >,
              document.getElementById("alert")
            );
            this.state.Starting = this.Starting.value;
            this.state.Ending = this.Ending.value;
            this.state.day = this.day.value;
            this.state.id_me = this.Subject.value;
            this.state.Periods.forEach(item => {
              var date1 = new Date(item.dated_periode_etude);
              var date2 = new Date(item.datef_periode_etude);
              this.seances = getDaysBetweenDates(date1, date2, this.state.day);
              //add hours to the dat 
              date1.setHours(this.state.Starting.substr(0, 2), this.state.Starting.substr(3, 2));
              date2.setHours(this.state.Starting.substr(0, 2), this.state.Starting.substr(3, 2));
              this.seances.forEach((item, index) => {
                item.setHours(this.state.Starting.substr(0, 2), this.state.Starting.substr(3, 2));
                this.state.classes_days_start[index] = item.getFullYear() + "-" + (item.getMonth() + 1) + "-" + item.getDate() + " " + item.getHours() + ":" + item.getMinutes();
                item.setHours(this.state.Ending.substr(0, 2), this.state.Ending.substr(3, 2));
                this.state.classes_days_end[index] = item.getFullYear() + "-" + (item.getMonth() + 1) + "-" + item.getDate() + " " + item.getHours() + ":" + item.getMinutes();
              });
            });
            var posturl = Url.url + "Levels/weekly_schedule/addClass.php";
            Axios.post(posturl,
              {
                Starting: this.state.Starting,
                Ending: this.state.Ending,
                id_me: this.state.id_me,
                day: this.state.day,
                classes_days_start: this.state.classes_days_start,
                classes_days_end: this.state.classes_days_end
              })
              .then((res) => {
                console.log(res.data)
                if (res.data.msg == "l enseignant n est pas disponible") {
                  ReactDOM.render(
                    <Alert variant="filled" severity="error">{Counterpart.translate("teach_not_dispo")}</Alert >,
                    document.getElementById("alert")
                  );
                } else {
                  ReactDOM.render(
                    <Weeklyschedule_tab id={this.props.id} />,
                    document.getElementById("tab")
                  );

                }
              });
          }
        } else {
          ReactDOM.render(
            <Alert variant="filled" severity="error">{Counterpart.translate("week_add_fail1")}</Alert >,
            document.getElementById("alert")
          );
        }

      });
  };



  //this class start rendering
  render() {
    var posturl = Url.url + "Levels/Study_periods/getStudy_periods.php";
    Axios.post(posturl, {
      level_id: this.props.id
    }
    )
      .then((res) => {
        this.state.Periods = res.data.Periods;
      });
    var posturl = Url.url + "Levels/weekly_schedule/getSubjects.php";
    //get Subject and render it in options input
    Axios.post(posturl, {
      id_niveau: this.props.id,
    })
      .then((res) => {
        this.options_items = res.data.Subjects.map((item, index) => {
          if (this.props.value != item.nom_matiere) {
            return (
              <option value={item.id_matiere_enseignant} key={index}>
                {item.nom_matiere}
              </option>
            )
          }
        });
        ReactDOM.render(
          <select id="matieres" class="form-control" ref={(val) => (this.Subject = val)}
            onChange={() => {
              this.state.id_me = this.Subject.value;
            }}>
            {this.options_items}
          </select>,
          document.getElementById("options")
        );
      });
    return (
      < div
        className="card text-white  studentform mb-3 shdw color-darblue"
        id="title"
      >
        <div className="card-header" id="title">
          <h3><Translate className="edit_subject_title"  content="new_week_schedul" component="h3" /></h3>
        </div>
        <div id="alert"></div>
        <div class="card-body">
          <div>
            <form >
              <div class="form-group">
                <label class="righttoleft"><Translate content="day" component="h3" /> </label>
                <select name="weekday" class="form-control" ref={(val) => (this.day = val)}
                  onChange={() => {
                    this.state.day = this.day.value;
                  }}>

                  <option value="0">{Counterpart.translate("Sunday")}</option>
                  <option value="1">{Counterpart.translate("Monday")}</option>
                  <option value="2">{Counterpart.translate("Tuesday")}</option>
                  <option value="3">{Counterpart.translate("Wednesday")}</option>
                  <option value="4">{Counterpart.translate("Thursday")}</option>
                  <option value="5">{Counterpart.translate("Friday")}</option>
                  <option value="6">{Counterpart.translate("Saturday")}</option>
                </select>

                <label class="righttoleft"><Translate content="subject" component="h3" /> </label>
                <div id="options"></div>

                <label class="righttoleft"><Translate content="date_deb" component="h3" /> </label>
                <input

                  type="time"
                  class="form-control"
                  ref={(val) => (this.Starting = val)}
                  onChange={() => {
                    this.state.Starting = this.Starting.value;
                  }
                  }
                  Value={this.props.row.nom_matiere}
                />

                <label class="righttoleft"><Translate content="date_fin" component="h3" />  </label>
                <input

                  type="time"
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
                  className="btn btn-danger btnrt Subject_cancel_btn"

                />

              </div>
            </form>
            <Translate
              content="btn_save"

              component="button"
              class="btn btn-success btnrt margin_r_10 Subject_save_btn"
              onClick={() => { this.insertclass() }}
            />
          </div>
        </div> </div>
    );
  }
}

export default Weeklyschedule_form;
