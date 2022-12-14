import React, { Component } from "react";
import axios from "axios";
import Url from "../../api/Apiurl";
import Levelsgeditform from './Levelsgeditform'
import { makeStyles } from "@material-ui/core/styles";
import Levelsgform from "./Levelsgform";
import Levels_gDetails from "./Levels_gDetails";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactDOM from "react-dom";
import { BiTrash } from "react-icons/bi";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Info } from "react-bootstrap-icons";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import { FcInspection, FcCancel } from "react-icons/fc";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const { SearchBar } = Search;

class Levelsgtab extends Component {
  nbr = {
    nbr: "",
  };
  placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
  };
  state = {
    row: {},
    levels_g: [],
  };
  raw = {
    id: "",
    nom: "",
  };
  columns = [
    {
      dataField: "id_niveau_g",
      text: <Translate type="text" content="id" />,
      sort: true,
    },
    {
      dataField: "nom_niveau_g",
      text: <Translate type="text" content="level" />,
      sort: true,
    },
    {
      dataField: "order_niveau_g",
      text: <Translate type="text" content="order" />,
      sort: true,
    },
    {
      dataField: "",
      text: <Translate type="text" content="actions" />,
      sort: true,
      formatter: (cell, row) => (
        <div>
          <button
            className="btn btn-outline-info btn-sm "
            onClick={() => this.render_form_and_tabs(row)}
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
            onClick={() => this.delete_levelg(row)}
          >
            <BiTrash />
          </button>
        </div>
      ),
    },
  ];
  //get details
  //get number of students in every level
  render_form_and_tabs = (row) => {
    console.log("testtab", this.state);
    ReactDOM.render(
      <Levels_gDetails row_level={row} />,
      document.getElementById("details_level")
    );
  };
  //set vlues
  edit = (index) => {
    console.log(index);
    ReactDOM.render(
      <Levelsgeditform row={index} state={this.props.state} />,
      document.getElementById("editForm")
    );
  };
  //delete level g 
  delete_levelg(row){
    var posturl = Url.url + "Levels_g/deleteLevelg.php";
    console.log(row);
        axios.post(posturl, {
            levelg_id: row.id_niveau_g,
        }).then((res) => {
          console.log(res.data);   
          this.componentDidMount();      
        })
  }
  //get Levels_g
  componentDidMount() {
    //sen request
    var posturl = Url.url + "Levels_g/getLevels_g.php";
    axios
      .get(posturl)
      .then((res) => {
        this.props.state.Levels_g = res.data.Levels_g;
        //this local state to send is to the details components and get it back
        this.state.Levels_g = this.props.state.Levels_g;
        //this local state to send is to the details components and get it back
        console.log(this.props.state.Levels_g);
        ReactDOM.render(
          <React.Fragment>
            <ToolkitProvider
              keyField="name"
              data={res.data.Levels_g}
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
    return (
      <di>
        <div id="tttt"></div>
      </di>
    );
  }
}

export default Levelsgtab;
