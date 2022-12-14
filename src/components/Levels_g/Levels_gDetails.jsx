import React, { Component }  from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";
import Subjectgtab from './Subjectsgtab';
import Close_button from './Close_button';
import Lveles_g from './Levels_g';
import Subjectsgform from "./Subjectsgform"
import Url from "../../api/Apiurl";
import Subjectsgupdateform from "./Subjectsgupdateform";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import { FcInspection, FcCancel } from "react-icons/fc";
import Translate from "react-translate-component";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Avatar from "@material-ui/core/Avatar";
import Counterpart from "counterpart";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import { FcRedo } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
class Levels_gDetails extends Component {
    state = {
      Levels_g: [],
    };
    render() {
        return (
          <React.Fragment>
            <div className="container-fluid" id="details_level">
            <div className="topbar">
            <p class="name_level_title mrg_left_0 p_back_level level_name_title">
              {this.props.row_level.nom_niveau_g}
              <span  onClick={()=>{
                  ReactDOM.render(
                    <Lveles_g />,
                    document.getElementById("details_level")
                  )}
              }>
              <Close_button className="colse_custom" /></span>
            </p>
            </div>
            <hr/>
            <p className="p_subjects_list">{Counterpart.translate("subject_list")}</p>
            <hr/>
              <div className="row">
                <div className="col-4">
                  <div id="add_form">
                  <Subjectsgform state={this.props} />
                  </div>
                </div>
                <div className="col-8" id="subjects_g_table">
                <Subjectgtab state={this.props} />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }
    }
    export default Levels_gDetails;