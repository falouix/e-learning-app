import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Levelform from "./Levelsform";
import Levelseditform from './Levelseditform';
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactDOM from "react-dom";
import Leveldetails from "./Leveldetails";
import Level_config_menu from "./Level_config_menu";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { FcInspection, FcCancel } from "react-icons/fc";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
var data = JSON.parse(sessionStorage.getItem("session"));
function get_students_number(row, nbr) {
  var posturl = "";
   console.log("students number", row.order_niveau_g);
   if(row.order_niveau_g==="0"){
     console.log("special");
      posturl = Url.url + "Levels/getstudentsnumber.php?type='special'";
   }else{
    var posturl = Url.url + "Levels/getstudentsnumber.php";
   }
  axios
    .post(posturl,
      { level_id: row.id_niveau }
    )
    .then(
      function ({ data }) {
        nbr.nbr = data.Levels;
        ReactDOM.render(
          <React.Fragment>{nbr.nbr}</React.Fragment>,
          document.getElementById(row.id_niveau)
        );
      }.bind(this)
    );
}
var rowClasses = "";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const { SearchBar } = Search;
class Studentstab extends Component {
  getCondition(row) {
    if (row.active_niveau == 1) {
      return (<Translate type="text" content="active" />)
    } else {
      return (<Translate type="text" content="not_active" />)
    }
  }
  nbr = {
    nbr: "",
  };
  placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
  };
  raw = {
    id: "",
    nom: "",
    prenom: "",
    cin: "",
    tel: "",
    mail: "",
    login: "",
  };
  state = {
    row: {},
    levels: [],
    selectedFile: null,
    file: null,
  };
  raw = {
    id: "",
    nom: "",
  };
  columns = [
  ];
  //get number of students in every level
  render_form_and_tabs = (row) => {
    this.state.row = row;
    ReactDOM.render(
      <Level_config_menu row_level={this.state} />,
      document.getElementById("details_level")
    );
    /*ReactDOM.render(
      <Leveldetails row_level={this.state} />,
      document.getElementById("details_level")
    );*/
  };
  render_menu = (row) => {
    this.state.row = row;
    ReactDOM.render(
      <Level_config_menu row_level={this.state} />,
      document.getElementById("details_level")
    );
    /*ReactDOM.render(
      <Leveldetails row_level={this.state} />,
      document.getElementById("details_level")
    );*/
  };
  //get avatar img
  updateLevel = (event) => {
    event.preventDefault();
    var posturl = Url.url + "Levels/updateLevels.php";
    axios
      .post(posturl,
        {
          level_id: this.raw.id,
          level_name: this.raw.nom,
        }
      )
      .then(
        function ({ data }) {
          this.componentDidMount();
          ReactDOM.render(
            <React.Fragment>
              <Levelform />
            </React.Fragment>,
            document.getElementById("editForm")
          );
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  };
  //set values
  edit = (index) => {
    ReactDOM.render(
      <React.Fragment>
        <Levelseditform row={index} state={this.props.state} />
      </React.Fragment>,
      document.getElementById("editForm")
    );
  };
  //delete llevel
  delete_level(row){
    console.log(row);
    var posturl = Url.url + "Levels/deleteLevel.php";
    console.log(row.id_niveau);
        axios.post(posturl, {
            level_id: row.id_niveau,
        }).then((res) => {
          console.log(res.data);   
          this.componentDidMount();      
        })
  }
  //get Levels
  componentDidMount() {
    //sen request
    data = JSON.parse(sessionStorage.getItem("session"));
    if((data.type=="etudiant")||(data.type=="enseignant")){
      this.columns = [
        {
          dataField: "nom_niveau_g",
          text: <Translate type="text" content="level" />,
          sort: true,
        },
        {
          dataField: "annee_niveau",
          text: <Translate type="text" content="scholar_year" />,
          sort: true,
        },
        {
          dataField: "order_niveau_g",
          text: <Translate type="text" content="order" />,
          sort: true,
        },
        {
          dataField: "",
          text: <Translate type="text" content="condition" />,
          sort: true,
          formatter: (cell, row) => (
            this.getCondition(row)
          )
        },
        {
          dataField: "",
          text: <Translate type="text" content="sutdents_number" />,
          sort: true,
          formatter: (cell, row) => (
            <div id={row.id_niveau}>{get_students_number(row, this.nbr)}</div>
          ),
        },
        {
          dataField: "",
          text: <Translate type="text" content="actions" />,
          sort: true,
          formatter: (cell, row) => (
            <div>
              <button
                className="btn btn-outline-info btn-sm "
                onClick={() => this.render_menu(row)}
              >
                <FcInspection />
              </button>
            </div>
          ),
        },
      ];
    }else{
      this.columns = [
        {
          dataField: "nom_niveau_g",
          text: <Translate type="text" content="level" />,
          sort: true,
        },
        {
          dataField: "annee_niveau",
          text: <Translate type="text" content="scholar_year" />,
          sort: true,
        },
        {
          dataField: "order_niveau_g",
          text: <Translate type="text" content="order" />,
          sort: true,
        },
        {
          dataField: "",
          text: <Translate type="text" content="condition" />,
          sort: true,
          formatter: (cell, row) => (
            this.getCondition(row)
          )
        },
        {
          dataField: "",
          text: <Translate type="text" content="sutdents_number" />,
          sort: true,
          formatter: (cell, row) => (
            <div id={row.id_niveau}>{get_students_number(row, this.nbr)}</div>
          ),
        },
        {
          dataField: "",
          text: <Translate type="text" content="actions" />,
          sort: true,
          formatter: (cell, row) => (
            <div>
              <button
                className="btn btn-outline-info btn-sm "
                onClick={() => this.render_menu(row)}
              >
                <FcInspection />
              </button>
              <button
                className="btn btn-outline-success btn-sm margin_left_6 "
                onClick={() => this.edit(row)}
              >
                <FiEdit />
              </button>
              <button
                className="btn btn-outline-danger btn-sm margin_left_6 "
                onClick={() => this.delete_level(row)}
              >
                <BiTrash />
              </button>
            </div>
          ),
        },
      ];
    }
    var posturl ="";
    if(data.type=="etudiant"){
      if(data.flag){
        console.log("this is guest");
        posturl = Url.url + "Levels/getLevels.php?id_etudiant="+data.id_etudiant+"&id_guest_niveau="+data.id_niveau;
      }else{
      posturl = Url.url + "Levels/getLevels.php?id_etudiant="+data.id_etudiant;
      }
    }
  if(data.type=="enseignant"){
    posturl = Url.url + "Levels/getLevels.php?id_enseignant="+data.id_enseignant;
}
if(data.type=="user"){
      posturl = Url.url + "Levels/getLevels.php";
    }
    console.log(posturl);
    axios
      .get(posturl)
      .then((res) => {
        this.props.state.Levels = res.data.Levels;
        //this local state to send is to the details components and get it back
        this.state.levels = this.props.state.Levels;
        //this local state to send is to the details components and get it back
        ReactDOM.render(
          <React.Fragment>
            <div id="tab">
              <ToolkitProvider
                keyField="name"
                data={this.props.state.Levels}
                columns={this.columns}
                search
              >
                {(props) => (
                  <div>
                    <SearchBar {...props.searchProps} className="bckgr" />
                    <BootstrapTable
                      {...props.baseProps}
                      pagination={paginationFactory()}
                      rowClasses={rowClasses}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </div>
          </React.Fragment>,
          document.getElementById("tttt")
        );
      });
  }
  render() {
    return (
      <di>
        <div id="tttt"></div>
      </di>
    );
  }
}
export default Studentstab;
