import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Url from "../../../api/Apiurl";
import Weeklyschedule_form from "./Weeklyschedule_form";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FcDownload } from "react-icons/fc";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import Translate from "react-translate-component";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Weeklyschedule_editfrorm from "./weeklyschedule_editfrom";
import Counterpart from "counterpart";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
function get_teacher_name(row) {
  var posturl = Url.url + "Levels/weekly_schedule/getteachername.php";
  axios
    .post(posturl,
      { teacher_id: row.id_enseignant }
    )
    .then(
      function ({ data }) {
        ReactDOM.render(
          <>{data.teachers[0].nom_enseignant}</>,
          document.getElementById(row.id_semaine)
        );

      }.bind(this)
    );
}
function get_subject_name(row) {
  var posturl = Url.url + "Levels/weekly_schedule/getsubjectname.php";
  axios
    .post(posturl,
      { subject_id: row.id_matiere }
    )
    .then(
      function ({ data }) {
        ReactDOM.render(
          <>{data.subjects[0].nom_matiere}</>,
          document.getElementById(row.id_semaine + "a")
        );

      }.bind(this)
    );
}
class Weeklyschedule_tab extends Component {
  data = JSON.parse(sessionStorage.getItem("session"));
  week_days = [
    Counterpart.translate("Sunday"),
    Counterpart.translate("Monday"),
    Counterpart.translate("Tuesday"),
    Counterpart.translate("Wednesday"),
    Counterpart.translate("Thursday"),
    Counterpart.translate("Friday"),
    Counterpart.translate("Saturday"),
  ];
  editclass(row) {
    ReactDOM.render(
      <Weeklyschedule_editfrorm row={row} id={this.props.id} />,
      document.getElementById("editForm")
    );
  }
  columns = [];
  render() {
    if((this.data.type=="enseignant")){
      var posturl = Url.url + "Levels/weekly_schedule/getWeeks.php?id="+this.data.id_enseignant;
      }else{
        var posturl = Url.url + "Levels/weekly_schedule/getWeeks.php";
      }
    if((this.data.type=="etudiant")||(this.data.type=="enseignant")){
      this.columns = [
        {
          dataField: "",
          text: Counterpart.translate("day"),
          sort: true,
          formatter: (cell, row) => (
            <p>{this.week_days[row.jour_semaine]}</p>
          )
        },
        {
          dataField: "",
          text: Counterpart.translate("subject"),
          sort: true,
          formatter: (cell, row) => (
            <div id={row.id_semaine + "a"}>{get_subject_name(row)}</div>
          )
        },
        {
          dataField: "",
          text: Counterpart.translate("proffesor"),
          sort: true,
          formatter: (cell, row) => (
            <div id={row.id_semaine}>{get_teacher_name(row)}</div>
          )
        },
        {
          dataField: "debut_semaine",
          text: Counterpart.translate("start_time"),
          sort: true,
    
        },
        {
          dataField: "fin_semaine",
          text: Counterpart.translate("end_time"),
          sort: true,
    
        },
      ];
    }else{
      this.columns = [
        {
          dataField: "",
          text: Counterpart.translate("day"),
          sort: true,
          formatter: (cell, row) => (
            <p>{this.week_days[row.jour_semaine]}</p>
          )
        },
        {
          dataField: "",
          text: Counterpart.translate("subject"),
          sort: true,
          formatter: (cell, row) => (
            <div id={row.id_semaine + "a"}>{get_subject_name(row)}</div>
          )
        },
        {
          dataField: "",
          text: Counterpart.translate("proffesor"),
          sort: true,
          formatter: (cell, row) => (
            <div id={row.id_semaine}>{get_teacher_name(row)}</div>
          )
        },
        {
          dataField: "debut_semaine",
          text: Counterpart.translate("start_time"),
          sort: true,
    
        },
        {
          dataField: "fin_semaine",
          text: Counterpart.translate("end_time"),
          sort: true,
    
        },
        {
          dataField: "",
          text: <Translate type="text" content="actions" />,
          sort: true,
          formatter: (cell, row) => (
            <div>
    
              <button
                className="btn btn-outline-success btn-sm margin_left_6 "
                onClick={() => { this.editclass(row) }}
              >
                <FiEdit />
              </button>
              <button
                className="btn btn-outline-danger btn-sm margin_left_6 "
                onClick={() => { this.deleteclass(row) }}
              >
                <FiXOctagon />
              </button>
            </div>
          ),
        },
      ];
    }
    
    axios
      .post(posturl,
        {
          level_id: this.props.id
        }
      )
      .then((res) => {
        ReactDOM.render(
          <React.Fragment>
            <ToolkitProvider
              keyField="name"
              data={res.data.Weeks}
              columns={this.columns}
              search
            >
              {(props) => (
                <div>
                  <BootstrapTable
                    {...props.baseProps}
                    pagination={paginationFactory()}
                  />
                </div>
              )}
            </ToolkitProvider>
          </React.Fragment>,
          document.getElementById("tttt")
        );
      });

    return <div id="tttt"></div>;
  }
}
export default Weeklyschedule_tab;
