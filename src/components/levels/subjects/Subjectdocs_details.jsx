import React, { useState, Component } from "react";
import Subjectdocs_form from "./Subjectdocs_form";
import Subjectdocs_tab from "./Subjectdocs_tab";
import ReactDOM from "react-dom";
import Translate from "react-translate-component";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Avatar from "@material-ui/core/Avatar";
import Counterpart from "counterpart";

class Subjectdocs_details extends Component {
    state = {
        Periods: [],
    };
    render() { 
        var data = JSON.parse(sessionStorage.getItem("session"));
        if(data.type=="etudiant"){
            return (
                <React.Fragment>
                      <p className="name_level_title mrg_left_0 p_back_level">
                <span>{this.props.state.state.row_level.row.nom_niveau_g}</span>
                /<span className="span_subject_name">{this.props.row.nom_matiere}</span>/{Counterpart.translate('doc_subject_level')}
            </p>
            <hr />
                    <div className="row">
                        <div className="col-12" id="doc_tab">
                            <Subjectdocs_tab state={this.props} />
                        </div>
                    </div>
                </React.Fragment>
            );
        }else{
            return (
                <React.Fragment>
                    <p className="name_level_title mrg_left_0 p_back_level">
                <span>{this.props.state.state.row_level.row.nom_niveau_g}</span>
                /<span className="span_subject_name">{this.props.row.nom_matiere}</span>/{Counterpart.translate('doc_subject_level')}
            </p>
            <hr />
                    <div className="row">
                        <div className="col-4">
                            <div id="editForm">
                                <Subjectdocs_form state={this.props} />
                            </div>
                        </div>
                        <div className="col-8" id="doc_tab">
                            <Subjectdocs_tab state={this.props} />
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        
    }
}
export default Subjectdocs_details;
