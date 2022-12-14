import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import Edit_form from './Edit_form';
import Subjectdocs_details from "./Subjectdocs_details";
import Level_config_menu from "../Level_config_menu"
import ar from "../../../languages/ar-TN";
import { FiEdit, FiXOctagon, FiFile } from "react-icons/fi";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

const { SearchBar } = Search;

class Level_subject_tab1 extends Component {
    close_tab(){
            console.log(this.props);
            ReactDOM.render(
                     <div className="subjects_table">
                         <Level_config_menu row_level={this.props.state.row_level} />
                    </div>,
                document.getElementById("tab_level")
              );
    }
     data = JSON.parse(sessionStorage.getItem("session"));
     
    columns = [];
    test = this.props;
    render() {
        console.log("type from subjects details",this.data.type);
        if(this.data.type=="etudiant"){
            this.columns = [
                {
                    dataField: "nom_matiere",
                    text: <Translate type="text" content="subject" />,
                    sort: true,
                },
                {
                    dataField: "",
                    text: <Translate type="text" content="teacher" />,
                    sort: true,
                    formatter: (cell, row) => (
                        <p> {row.prenom_enseignant}  {row.nom_enseignant}</p>
                    )
                },
                {
                    dataField: "",
                    text: <Translate type="text" content="actions" />,
                    sort: true,
                    formatter: (cell, row) => (
                        <div>
                            <button
                                className="btn btn-outline-info btn-sm margin_left_6 "
                                onClick={() => {
                                    console.log(row);
                                    if (row.id_matiere_enseignant == null) {
                                        ReactDOM.render(
                                            <div className="txt_cntr">
                                                <hr />
                                                <h2 style={{ float: 'center' }}> {Counterpart.translate("no_teacher")}</h2>
                                            </div>,
                                            document.getElementById("subject_doc")
                                        )
                                    } else {
                                        ReactDOM.render(
                                            <Subjectdocs_details row={row} state={this.props.state} />,
                                            document.getElementById("subject_doc")
                                        )
                                    }
                                }
                                }
                            >
                                <FiFile />
                            </button>
                        </div >
                    ),
                },
            ];
        }else{
            this.columns = [
                {
                    dataField: "nom_matiere",
                    text: <Translate type="text" content="subject" />,
                    sort: true,
                },
                {
                    dataField: "",
                    text: <Translate type="text" content="teacher" />,
                    sort: true,
                    formatter: (cell, row) => (
                        <p> {row.prenom_enseignant}  {row.nom_enseignant}</p>
                    )
                },
                {
                    dataField: "",
                    text: <Translate type="text" content="actions" />,
                    sort: true,
                    formatter: (cell, row) => (
                        <div>
                            <button
                                className="btn btn-outline-info btn-sm margin_left_6 "
                                onClick={() => {
                                    console.log(row);
                                    if (row.id_matiere_enseignant == null) {
                                        ReactDOM.render(
                                            <div className="txt_cntr">
                                                <hr />
                                                <h2 style={{ float: 'center' }}> {Counterpart.translate("no_teacher")}</h2>
                                            </div>,
                                            document.getElementById("subject_doc")
                                        )
                                    } else {
                                        ReactDOM.render(
                                            <Subjectdocs_details row={row} state={this.props.state} />,
                                            document.getElementById("subject_doc")
                                        )
                                    }
                                }
                                }
                            >
                                <FiFile />
                            </button>
                            <button
                                className="btn btn-outline-success btn-sm margin_left_6 "
                                onClick={() => {
                                    console.log("props to send to edit", this.props);
                                    ReactDOM.render(
                                        <Edit_form row={row} state={this.props.state} />,
                                        document.getElementById("form_edit_subject")
                                    )
                                }
                                }
                            >
                                <FiEdit />
                            </button>
                            <button className="btn btn-outline-danger btn-sm margin_left_6 "
                                onClick={() => console.log("delete", row)}
                            >
                                <BiTrash />
                            </button>
                        </div >
                    ),
                },
            ];
        }
        var posturl = Url.url + "Levels/getSubjects_level.php";
        axios
            .post(posturl,
                {
                    level_id: this.props.state.row_level.row.id_niveau,
                    id_niveau_g: this.props.state.row_level.row.id_niveau_g
                }
            )
            .then(
                function ({ data }) {
                   /* ReactDOM.render(
                        <React.Fragment>
                                <ToolkitProvider
                                    keyField="name"
                                    data={data.Subjects}
                                    columns={this.columns}

                                    search
                                >
                                    {(props) => (
                                        <div id="subjects_table">
                                            <SearchBar {...props.searchProps} className="bckgr" />
                                            <BootstrapTable
                                                {...props.baseProps}
                                                pagination={paginationFactory()}
                                            />
                                        </div>
                                    )}
                                </ToolkitProvider>
                        </React.Fragment>,
                        document.getElementById("subjects_table")
                    );*/
                }.bind(this)
            );
            /*ReactDOM.render(
                <img 
                src="https://icons-for-free.com/iconfiles/png/512/circle+close+cross+delete+exit+remove+icon-1320085939591374353.png"
                onClick={()=>this.close_tab()}
                />,
                
                document.getElementById("back_button")
            );*/

        return (
            <div>
                 <div id="back_button"> <img 
                src="https://icons-for-free.com/iconfiles/png/512/circle+close+cross+delete+exit+remove+icon-1320085939591374353.png"
                onClick={()=>this.close_tab()}
                /></div>
                <div id="subjects_table"></div>
            </div>
        );
    }
}

export default Level_subject_tab1;
