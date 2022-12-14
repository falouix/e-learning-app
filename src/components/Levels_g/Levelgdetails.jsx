import React from "react";
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
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
function documents_details_close() {
  ReactDOM.render(<></>, document.getElementById("documents_details"));
}
const { SearchBar } = Search;
const Subjects = [
  {
    dataField: "nom_matiere",
    text: <Translate type="text" content="subject" />,
    sort: true,
  },
  {
    dataField: "",
    text: <Translate type="text" content="actions" />,
    sort: true,
    formatter: (cell, row) => (
      <div>
        <button className="btn btn-outline-success btn-sm margin_left_6 " onClick={() => editSubjectg(row)}>
          <FiEdit />
        </button>
        <button className="btn btn-outline-danger btn-sm margin_left_6 ">
          <FiXOctagon />
        </button>
      </div>
    ),
  },
];
function editSubjectg(row, row_level) {
  console.log(row);
  ReactDOM.render(
    <Subjectsgupdateform state={row} state={row_level} />,
    document.getElementById("add_form"));

}
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

export default function Levelgdetails(row_level) {
  console.log("details", row_level);

  const placeholders = {
    subject: Counterpart.translate("subject"),
    teacher: Counterpart.translate("teacher"),
    nom: Counterpart.translate("Name"),
  };
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("testdetails", row_level.row);
  return (
    <div>
      <div className={classes.root} className="tabs_div">
        <h1>{row_level.row_level.nom_niveau_g}</h1>
        <hr />
        <AppBar position="static" className="tab_list_color">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              label={<h5><Translate type="text" content="Subjects" /></h5>}
            />
            <Tab
              label={<button
                className="btn btn-danger"
                onClick={() => {
                  ReactDOM.render(
                    <Lveles_g />,
                    document.getElementById("details_level")
                  )
                }}
              >
                {Counterpart.translate("close")}
              </button>}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        </TabPanel>
      </div>
      <div className="row">
        <div id="add_form" className="col-4">
          <Subjectsgform state={row_level} />
        </div>
        <div id="subjects_g_table" className="col-8">
          <Subjectgtab state={row_level} />
        </div>
      </div>
    </div>
  );
}
