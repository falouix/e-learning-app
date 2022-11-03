import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Studyperiods_editform from './Studyperiods_editform';
import Url from "../../../api/Apiurl";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FcDownload } from "react-icons/fc";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import Translate from "react-translate-component";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Counterpart from "counterpart";
class Studyperiods_tab extends Component {
   data = JSON.parse(sessionStorage.getItem("session"));
   
  columns = [
    
  ];
  updateperiod(index) {
    ReactDOM.render(
      <React.Fragment>
        <Studyperiods_editform index={index} state={this.props.state} id={this.props.id} row={this.props.row} />
      </React.Fragment>,
      document.getElementById("Studyperiods_form")
    );
  }
  deleteperiod(period) {
    var posturl = Url.url + "Levels/Study_periods/deleteStudy_periods.php";
    axios
      .post(posturl,
        {
          level_id: period.id_niveau,
          period_id: period.id_periode_etude
        }
      )
      .then(({ data }) => {
        if (data.msg = "File  was deleted!") {
          var posturl = Url.url + "Levels/Study_periods/getStudy_periods.php";
          axios
            .post(posturl, {
              level_id: this.props.id
            }
            )
            .then((res) => {
              this.props.state.Periods = res.data.Periods;
              ReactDOM.render(
                <React.Fragment>
                  <ToolkitProvider
                    keyField="name"
                    data={this.props.state.Periods}
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
        }


      });

  }
  render() {
    if((this.data.type="etudiant")||(this.data.type="enseignant")){
      this.columns=[
        {
          dataField: "dated_periode_etude",
          text: Counterpart.translate("start_time"),
          sort: true,
        },
        {
          dataField: "datef_periode_etude",
          text: Counterpart.translate("end_time"),
          sort: true,
        },
      ]

    }else{
      this.columns=[
        {
          dataField: "dated_periode_etude",
          text: Counterpart.translate("start_time"),
          sort: true,
        },
        {
          dataField: "datef_periode_etude",
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
                id={row.id_documents}
                className="btn btn-outline-success  btn-sm margin_left_6 "
                onClick={() => { this.updateperiod(row) }}
              >
                <FiEdit />
              </button>
    
              <button
                className="btn btn-outline-danger btn-sm margin_left_6 "
                onClick={() => { this.deleteperiod(row) }}
              >
                <FiXOctagon />
              </button>
            </div>
          ),
        },
      ]
    }
    var posturl = Url.url + "Levels/Study_periods/getStudy_periods.php";
    axios
      .post(posturl, {
        level_id: this.props.id
      }
      )
      .then((res) => {
        ReactDOM.render(
          <React.Fragment>
            <ToolkitProvider
              keyField="name"
              data={res.data.Periods}
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
export default Studyperiods_tab;
