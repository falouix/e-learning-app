import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactDOM from "react-dom";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { HiPencilAlt } from "react-icons/hi";
import { BiTrash } from "react-icons/bi";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Url from "../../api/Apiurl";
import Teacherseditform from "./Teacherseditform";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const { SearchBar } = Search;

class Teachertab extends Component {
  state = {
    selectedFile: null,
    file: null,
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
  columns = [
    {
      dataField: "",
      text: <Translate type="text" content="avatar" />,
      sort: true,
      formatter: (cell, row) => (
        <Avatar alt={this.getAlt(row)} src={this.getAvatar(row)} />
      ),
    },
    {
      dataField: "prenom_enseignant",
      text: <Translate type="text" content="prenom" />,
      sort: true,
    },
    {
      dataField: "nom_enseignant",
      text: <Translate type="text" content="Name" />,
      sort: true,
    },
    {
      dataField: "cin_enseignant",
      text: <Translate type="text" content="cin" />,
      sort: true,
    },
    {
      dataField: "tel_enseignant",
      text: <Translate type="text" content="tel" />,
      sort: true,
    },
    {
      dataField: "mail_enseignant",
      text: <Translate type="text" content="mail" />,
      sort: true,
    },
    {
      dataField: "",
      text: <Translate type="text" content="actions" />,
      sort: true,
      formatter: (cell, row) => (
        <>
        <button
          className="btn btn-outline-success btn-sm "
          onClick={() => this.edit(row)}
        >
          <HiPencilAlt />
        </button>
        <button
        className="btn btn-outline-danger margin-right-5 btn-sm "
        onClick={() => this.deleteTeacher(row)}
      >
        <BiTrash />
      </button>
      </>
      ),
    },
  ];
  //get avatar img
  getAvatar(row) {
    let srcimg = "https://uism-tn.com/api/img/teachers/";
    return srcimg + row.id_enseignant + ".jpg?aaa";
  }
  //get alt img
  getAlt(row) {
    return row.nom_enseignant;
  }
  // delete (desactivate teacher)
  deleteTeacher(row) {
    var posturl = Url.url + "Teachers/deleteTeacher.php";
    console.log(row);
    axios
    .post(posturl, 
      {teacher_id:row.id_enseignant})
    .then((res) => {
            console.log(res.data)
            this.componentDidMount();
    });
  }

  //set vlues
  edit = (index) => {

    this.raw.id = index.id_enseignant;
    this.raw.nom = index.nom_enseignant;
    this.raw.prenom = index.prenom_enseignant;
    this.raw.cin = index.cin_enseignant;
    this.raw.tel = index.tel_enseignant;
    this.raw.mail = index.mail_enseignant;
    this.raw.login = index.login_enseignant;
    console.log(this.raw);
    ReactDOM.render(
      <React.Fragment>
        <Teacherseditform index={index} state={this.props.state} />
      </React.Fragment>,
      document.getElementById("editForm")
    );
  };

  //get teachers
  componentDidMount() {
    var posturl = Url.url + "Teachers/getTeachers.php";
    //sen request
    axios
      .get(posturl)
      .then((res) => {
        this.props.state.teachers = res.data.teachers;
        console.log(this.props.state.teachers);
        ReactDOM.render(
          <React.Fragment>
            <ToolkitProvider
              keyField="name"
              data={this.props.state.teachers}
              columns={this.columns}
              search
            >
              {(props) => (
                <div>
                  <SearchBar {...props.searchProps} className="bckgr" />
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

  //id_handler

  //RENDER

  render() {
    return <div id="tttt"></div>;
  }
}

export default Teachertab;
