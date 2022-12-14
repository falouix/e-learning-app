import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Avatar from './avatar';
import Select from 'react-select';
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Url from "../../api/Apiurl";
import Studenteditform from './Studentseditform';
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactDOM from "react-dom";
import Userform from "./Studentsform";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { BiTrash } from "react-icons/bi";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import { HiPencilAlt } from "react-icons/hi";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
const listItems = {};
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

  level = {
    levels: [],
  };
  placeholders = {
    nom: Counterpart.translate("Name"),
    prenom: Counterpart.translate("prenom"),
    mail: Counterpart.translate("mail"),
    login: Counterpart.translate("login"),
    tel: Counterpart.translate("tel"),
    cin: Counterpart.translate("cin"),
    level: Counterpart.translate("level"),
  };
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
    level: "",
    level_name: "",
    level_etudiant: "",
  };
  columns = [
    {
      dataField: "",
      text: <Translate type="text" content="actions" />,
      sort: true,
      formatter: (cell, row) => (this.getAvatar(row)),
    },
    {
      dataField: "nom_etudiant",
      text: <Translate type="text" content="prenom" />,
      sort: true,
    },
    {
      dataField: "prenom_etudiant",
      text: <Translate type="text" content="Name" />,
      sort: true,
    },
    {
      dataField: "cin_etudiant",
      text: <Translate type="text" content="cin" />,
      sort: true,
    },
    {
      dataField: "tel_etudiant",
      text: <Translate type="text" content="tel" />,
      sort: true,
    },
    {
      dataField: "nom_niveau_g",
      text: <Translate type="text" content="level" />,
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
        onClick={() => this.deleteStudent(row)}
      >
        <BiTrash />
      </button>
        </>
      ),
    },
  ];
 //get avatar img
  // delete (desactivate teacher)
  deleteStudent(row) {
    var posturl = Url.url + "Students/deleteStudent.php";
    console.log(row);
    axios
    .post(posturl, 
      {id_etudiant:row.id_etudiant})
    .then((res) => {
            console.log(res)
            this.componentDidMount();
    });
  }
  //get avatar img
  getAvatar(row) {
    let id = {
      id: row.id_etudiant,
      alt: row.nom_etudiant,
      class: "small",
    }
    return (
      <Avatar id={id} />);
  }
  //get alt img
  getAlt(row) {
    return row.nom_etudiant;
  }

  //upload image
  fileSelect = (event) => {
    this.setState({ selectedFile: event.target.files[0] });

    this.setState({ file: URL.createObjectURL(event.target.files[0]) });
    ReactDOM.render(
      <React.Fragment>
        <img
          className="imgAvatar"
          src={URL.createObjectURL(event.target.files[0])}
        />
      </React.Fragment>,
      document.getElementById("avatarbig")
    );
  };
  fileUpload = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.raw.id);
    var posturl = Url.url + "Students/upload.php";
    axios
      .post(posturl,
        fd
      )
      .then((res) => {
        ReactDOM.render(
          <React.Fragment>
            <img
              className="imgAvatar"
              src={
                "http://127.0.0.1:8080/php-react/un_app/src/img/Students" +
                this.raw.id +
                ".jpg"
              }
            />
          </React.Fragment>,
          document.getElementById("avatarbig")
        );
        this.componentDidMount();
      });
  };
  //set vlues
  edit = (index) => {
    console.log(this.props.state);
    this.raw.id = index.id_etudiant;
    this.raw.nom = index.nom_etudiant;
    this.raw.prenom = index.prenom_etudiant;
    this.raw.cin = index.cin_etudiant;
    this.raw.tel = index.tel_etudiant;
    this.raw.mail = index.mail_etudiant;
    this.raw.login = index.login_etudiant;
    this.raw.level = index.id_niveau;
    this.raw.level_etudiant = index.id_niveau_etudiant;
    ReactDOM.render(
      <Studenteditform index={index} state={this.props.state} />,
      document.getElementById("editForm")
    );

  }
  //componentDidMount
  componentDidMount() {
    //sen request
    var posturl = Url.url + "Students/getStudents.php";
    axios.get(posturl).then((res) => {
      const listItems = res.data.Students.map((item) =>
        <option value={item.id_niveau_g}>{item.nom_niveau_g}</option>);
      this.props.state.Students = res.data.Students;
      ReactDOM.render(
        <React.Fragment>
          <ToolkitProvider
            keyField="name"
            data={this.props.state.Students}
            columns={this.columns}
            search
          >
            {(props) => (
              <div>
                <div class="form-group mb-2 row">
                  <div className="col-8" >
                    <SearchBar {...props.searchProps} className="bckgr " id="searchbar" ref={(val) => (this.searching = val)} />
                  </div>
                  <div id="level_filter" className="col-4" >
                  </div>
                </div>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </React.Fragment>,
        document.getElementById("Studentstab")
      );
    });
    var posturl1 = Url.url + "Students/getLevels.php";
    axios
      .get(posturl1)
      .then((res) => {
        const level_list = res.data.Levels.map((item, index) => {
          return (
            <option value={item.nom_niveau_g} key={index}>
              {item.nom_niveau_g}
            </option>
          );
        });
        ReactDOM.render(
          <React.Fragment>
            <select
              className="custom-select"
              ref={(val) => (this.studentlevel = val)}
              id="level_filter"
              required
              onChange={() => {
                console.log(this.searching.props.onSearch(this.studentlevel.value))
              }}
            >
              {level_list}
            </select>
          </React.Fragment >,
          document.getElementById("level_filter")
        );
      });
  }
  //RENDER
  render() {

    return <div id="Studentstab"></div>;
  }
}

export default Studentstab;