import React, { Component } from "react";
import Documents_form from "./Documents_form";
import Documents_tab from "./Documents_tab";
import ReactDOM from "react-dom";
import Close_button from './../../../Close_button'; 
import Level_config_menu from "./../Level_config_menu";
import Counterpart from "counterpart";
class Documents_details extends Component {
    close_tab(){
       ReactDOM.render(
            <div className="subjects_table">
                <Level_config_menu row_level={this.props.state.row_level} />
           </div>,
       document.getElementById("Subjects_details")
     );
    }
    render() {
        var data = JSON.parse(sessionStorage.getItem("session"));
        if((data.type=="etudiant")||(data.type=="enseignant")){
        return (
            <React.Fragment>
                <div id="Subjects_details" >
                <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('document_level_list')}
                    <span className="margin_top_5px"  
                          onClick={()=>this.close_tab()}>
                        <Close_button />
                    </span>
                </p>
                <hr />
                <div className="row">
                <hr />
                    <div className="col-12" id="doc_tab">
                        <Documents_tab state={this.props.state.row_level} />
                    </div>
                </div></div>
            </React.Fragment>
        );
    }else{
        return (
            <React.Fragment>
                <div id="Subjects_details" >
                <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('document_level_list')}
                    <span className="margin_top_5px"  
                          onClick={()=>this.close_tab()}>
                        <Close_button />
                    </span>
                </p>
                <hr />
                <div className="row">
                    <div className="col-4">
                        <div id="doc_form">
                            <Documents_form state={this.props.state.row_level} />
                        </div>
                    </div>
                    <div className="col-8" id="doc_tab">
                        <Documents_tab state={this.props.state.row_level} />
                    </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
    }
}
export default Documents_details;
