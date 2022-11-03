import React, { Component } from "react";
import axios from "axios";
import Url from "../../api/Apiurl";
import Levelsgeditform from './Levelsgeditform'
import { makeStyles } from "@material-ui/core/styles";
import Subjectsg from "./Levelsgform";
import Subjectsgupdateform from "./Subjectsgupdateform";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactDOM from "react-dom";
import { FcCheckmark,FcCancel } from "react-icons/fc";
import Levelgdetails from "./Levelgdetails";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Info } from "react-bootstrap-icons";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
const { SearchBar } = Search; 
class Subjectsgtab extends Component {
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
                    <button
                        className="btn btn-outline-success btn-sm margin_left_6 "
                        onClick={() => this.edit(row)}
                    >
                        <FiEdit />
                    </button>
                </div>
            ),
        },
        {
            dataField: "",
            text: <Translate type="text" content="color" />,
            sort: true,
            formatter: (cell, row) => (
                <div>
                    <form>
                    <input
                    Value={row.colorbg_matiere}
                    className="color_input_picker"
                    type="color" 
                    ref={(val) => (cell = val)}
                    onClick={()=>{
                        ReactDOM.render(
                            <>
                                <button 
                                onClick={()=>{
                        var posturl = Url.url + "Levels_g/color_Subjects.php";
                        console.log(posturl);
                        axios.post(posturl,
                            {
                                color_Subject: cell.value,
                                subject_id:row.id_matiere
                            }
                        )
                            .then((data) => {
                                    console.log(data);
                                    ReactDOM.render(
                                        <></>,
                                        document.getElementById(row.id_matiere)
                                    )
                            });
                                }}
                                className="a_save_color"
                                >
                                    {Counterpart.translate("btn_save")}
                                    <FcCheckmark/>
                                </button>
                                <button 
                                onClick={()=>{
                                    cell.value="#000000"
                                    ReactDOM.render(
                                        <></>,
                                        document.getElementById(row.id_matiere)
                                    )
                                }}
                                className="a_cancel_color"
                                >
                                    {Counterpart.translate("btn_cancel")}
                                    <FcCancel/>
                                </button>
                            </>,
                            document.getElementById(row.id_matiere)
                        );
                    }}
                    />
                    </form>
                    <div id={row.id_matiere}></div>
                </div>
            ),
        }
    ];
    //get details
    //set vlues
    edit = (index) => {
        ReactDOM.render(
            <Subjectsgupdateform row={index} state={this.props.state} />,
            document.getElementById("add_form")
        );
    };
    //get Levelsèè
    componentDidMount() {
        //sen request
        console.log(this.props);
        var posturl = Url.url + "Levels_g/getSubjects.php";
        axios.post(posturl,
            {
                id: this.props.state.row_level.id_niveau_g
            }
        )
            .then((data) => {
                console.log("Subjects of this levelg", data.data.Subjects_g);
                ReactDOM.render(
                    <React.Fragment>
                        <ToolkitProvider
                            keyField="name"
                            data={data.data.Subjects_g}
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
    render() {
        return (
            <di>
                <div id="tttt"></div>
            </di>
        );
    }
}
export default Subjectsgtab;
