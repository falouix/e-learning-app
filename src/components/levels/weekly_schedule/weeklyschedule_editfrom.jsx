import React, { Component } from "react";
import Axios, { post } from "axios";
import Url from "../../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Options from "./Options";
import Button from "react-bootstrap/Button";
import Weeklyschedule_form from "./Weeklyschedule_form";
import Weeklyschedule_tab from "./Weeklyschedule_tab";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
import Close_button from './../../../Close_button';
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class weeklyschedule_editfrom extends Component {
  placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
  };
  state = {
    day: "",
    Starting: "",
    Ending: "",
    id_me: "",
    subject: [],
  };
  //get Subjects
  days = [
    {
      name: Counterpart.translate("Sunday"),
      index: 0
    },
    {
      name: Counterpart.translate("Monday"),
      index: 1
    },
    {
      name: Counterpart.translate("Tuesday"),
      index: 2
    },
    {
      name: Counterpart.translate("Wednesday"),
      index: 3
    },
    {
      name: Counterpart.translate("Thursday"),
      index: 4
    },
    {
      name: Counterpart.translate("Friday"),
      index: 5
    },
    {
      name: Counterpart.translate("Saturday"),
      index: 6
    },
  ]
  items = <option></option>;
  //get subject
  componentDidMount() {
    var posturl = Url.url + "Levels/weekly_schedule/getSubjects.php";
    Axios.post(posturl, {
      id_niveau: this.props.id,
    })
      .then((res) => {
        this.options_items = res.data.Subjects.map((item, index) => {
          console.log(item.nom_matiere);

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
              this.props.state.id_me = this.Subject.value;
              console.log(this.Subject.value);
            }}>
            {this.options_items}
          </select>,
          document.getElementById("options")
        );
        console.log("this shit got me for real", res.data);
      });
  }
  //update class
  editclass = (event) => {
    var posturl = Url.url + "Levels/weekly_schedule/updateClass.php";
    this.state.Starting = this.Starting.value;
    this.state.Ending = this.Ending.value;
    this.state.day = this.day.value;
    this.state.id_me = this.Subject.value;
    console.log("edit form props ", this.props.row.id_semaine);
    console.log("edit form State to post", this.state);
    Axios.post(posturl,
      {
        Starting: this.state.Starting,
        Ending: this.state.Ending,
        id_me: this.state.id_me,
        day: this.state.day,
        id_s: this.props.row.id_semaine
      })
      .then((res) => {
        console.log(res);
        ReactDOM.render(
          <Weeklyschedule_tab id={this.props.id} />,
          document.getElementById("tab")
        );

      });
    /* ReactDOM.render(
       <Weeklyschedule_form row={this.props.row} id={this.props.id}/>,
       document.getElementById("editForm")
     );*/
  }

  render() {
    console.log("edit form props", this.props.row);
    return (
      console.log("msg"),
      <div
        className="card text-white  studentform mb-3 shdw color-darblue"
        id="title"
      ><span className="margin_top_5px"  
      onClick={() =>
        ReactDOM.render(
                <React.Fragment>
                  <Weeklyschedule_form row={this.props.row} />
                </React.Fragment>,
                document.getElementById("editForm")
              )}>
                    <Close_button />
                </span>
        <div className="card-header" id="title">
          <h3 className="edit_subject_title" >{Counterpart.translate("edit")}</h3>
        </div>
        <div class="card-body">
          <div>
            <form >
              <div class="form-group">
                <label className="righttoleft bold_font_16">{Counterpart.translate("day")}: </label>
                <select name="weekday" class="form-control" ref={(val) => (this.day = val)}
                  onChange={() => {
                    console.log(this.day.value);
                    this.state.day = this.day.value;
                  }}>
                  {this.days.map((item, index) => {
                    if (this.props.row.jour_semaine != item.index) {
                      return (
                        <option Value={item.index} key={index}>
                          {item.name}
                        </option>
                      );
                    } else {
                      return (
                        <option Value={item.index} key={index} className="bckgr" selected>
                          {item.name}
                        </option>
                      );
                    }
                  })}
                </select>
                <label className="righttoleft bold_font_16">{Counterpart.translate("subject")}:</label>
                <div id="options"></div>

                <label className="righttoleft bold_font_16">{Counterpart.translate("start_time")} : </label>
                <input
                  Value={this.props.row.debut_semaine}
                  type="time"
                  class="form-control"
                  ref={(val) => (this.Starting = val)}
                  onChange={() => {
                    this.state.Starting = this.Starting.value;
                    console.log(this.state.Starting);
                  }
                  }
                />
                <label className="righttoleft bold_font_16">{Counterpart.translate("end_time")} : </label>
                <input
                  Value={this.props.row.fin_semaine}
                  onChange={e => { this.Endinge.value = e.target.value }}
                  type="time"
                  class="form-control"
                  ref={(val) => (this.Ending = val)}
                  onChange={() => {
                    this.state.Ending = this.Ending.value;
                    console.log(this.state.Ending);
                  }
                  }
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
              onClick={() => { this.editclass() }}
            />
          </div>
        </div>
      </div>);
  }
}
export default weeklyschedule_editfrom;
