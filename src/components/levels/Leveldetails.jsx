import React, { useState } from "react";
import ReactDOM from "react-dom";
import Url from "../../api/Apiurl";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Documents_details from './document/Documents_details';
import Axios from "axios";
import Popup from 'reactjs-popup';
import Students_tab from "./Students/Students_tab";
import Levelstab from "./Levelstab";
import Level_subject_form from "./subjects/Level_subject_form";
import Level_subject_tab from "./subjects/Level_subject_tab";
import Levelform from "./Levelsform";
import Edit_form from "./subjects/Edit_form"
import Studyperiods from "./Study_periods/Studyperiods"
import Weekly_schedule from "./weekly_schedule/weekly_schedule"
import Classes_details from "./Classes/Classes_details"
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import { FcInspection } from "react-icons/fc";
import Translate from "react-translate-component";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Avatar from "@material-ui/core/Avatar";
import Counterpart from "counterpart";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import { Forward } from "react-bootstrap-icons";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
var data = JSON.parse(sessionStorage.getItem("session"));
function contactSubmit(e, row, data, type) {
  e.preventDefault();
  var etats_payment = document.getElementById("monselect").value
  var id_niveau_etudiant = document.getElementById("id_niveau_etudiant").value
  var url = "";
  if (type == "special") {
    url = "https://uism-tn.com/api/ValideMondat.php?etats_payment=" + etats_payment + "&id_niveau_etudiant=" + id_niveau_etudiant;
  } else {
    url = "https://uism-tn.com/api/ValideMondat.php?etats_payment=" + etats_payment + "&id_niveau_etudiant=" + id_niveau_etudiant;
  }
  Axios.post(url, { // receive two parameter endpoint url ,form data 
  })
    .then(res => {
      var list = document.getElementById("popup-root");
      list.remove()

      document.getElementById("simple-tab-0").click();
      setTimeout(() => {
        document.getElementById("simple-tab-3").click();
      }, 400);

    }).catch(function (error) {
      console.log(error);
    });
}
//check type of user
function check_type(row_level,data){
  console.log("data from check function",data)
    if(data.type==="etudiant"){
      console.log("etudiant");
      return(
        <div className="col-12" id="tab_level">
        <Level_subject_tab state={row_level} />
      <div className="container-fluid" id="documents_details"></div></div>
      );
    }else {
      return(
        <div className="row"> 
        <div className="col-8" id="tab_level">
        <Level_subject_tab state={row_level} />
        </div>
        <div className="col-4">
          <div id="form_edit_subject">
          </div>
        </div>
          <div className="container-fluid" id="documents_details"></div>
        </div>
      );
    }
}
//get tabs


const { SearchBar } = Search;
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
//////////////

//get Students
export default function Leveldetails(row_level) {
  
     
   var datax = JSON.parse(sessionStorage.getItem("session"));
  var subject_check=check_type(row_level,datax);
  if (row_level.row_level.row.order_niveau_g == 0) {
    var type = "special";
  } else {
    var type = "normal";
  }
  const placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
  };
  const row_level1 = row_level.row_level.row;
  const titre_level = row_level.row_level.row.nom_niveau_g;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  var titrelevel = <h2></h2>;
  if (row_level.row_level.row.order_niveau_g == 0) {
    titrelevel = <h2 className="redbckgrd flt_right"> {titre_level} (دورة استثنائية )</h2>
  } else {
    titrelevel = <h2 className="flt_right"> {titre_level} </h2>
  }
  return (
    <div>
      {titrelevel}
      <div className={classes.root} className="tabs_div ">
        <hr />
        <AppBar position="static" className="bckgrnd_spcl tab_list_color ">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label={Counterpart.translate('Subjects')}
            {...a11yProps(0)}
          />
          <Tab label={Counterpart.translate('documents_level')} {...a11yProps(1)} />
          <Tab
            label={Counterpart.translate('study_periods')}
            {...a11yProps(2)}
          />
          <Tab
            label={Counterpart.translate('Students')}
            {...a11yProps(3)}
          />
          <Tab label={Counterpart.translate('weekly_schedule')} {...a11yProps(4)} />
          <Tab label={Counterpart.translate('seances')} {...a11yProps(5)} />
          <Tab
            label={<button class="btn btn-danger btn-sm"><Translate content="close" /></button>}
            onClick={() => {
              var data = JSON.parse(sessionStorage.getItem("session"));
                  if(data.type=="etudiant"){
              ReactDOM.render(
                <div className="row">
                  <div className="col-12" id="tab">
                    <Levelstab state={row_level.row_level.levels} />
                  </div>
                </div>,
                document.getElementById("details_level")
              );}else{
                ReactDOM.render(
                  <div className="row">
                    <div className="col-4">
                      <div id="editForm">
                        <Levelform state={row_level.row_level.levels} />
                      </div>
                    </div>
                    <div className="col-8" id="tab">
                      <Levelstab state={row_level.row_level.levels} />
                    </div>
                  </div>,
                  document.getElementById("details_level")
                );
              }
            }}
          />
        </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className="row">
            {subject_check}
            <div className="container-fluid" id="documents_details"></div>
          </div>
          <div id="subject_doc"></div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Documents_details state={row_level} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Studyperiods state={row_level} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div id="students_table">
            <Students_tab state={row_level} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Weekly_schedule state={row_level} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <Classes_details state={row_level} />
        </TabPanel>
      </div>
    </div>
  );
}
