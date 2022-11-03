import React, { useState, Component } from "react";
import Level_subject_tab from "./Level_subject_tab";
import Level_subject_form from "./Level_subject_form";
import ReactDOM from "react-dom";
import Level_config_menu from "./../Level_config_menu";
import Close_button from './../../../Close_button';
import Counterpart from "counterpart";
class Subjects_details extends Component {
  state = {
    Periods: [],
  };
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
                <p className=" mrg_left_0">
                  {this.props.state.row_level.row.nom_niveau_g}
                    /{Counterpart.translate('subject_list')}
                </p>
                <hr />
        <div className="row">
          <div className="col-12" id="Studyperiods_tab">
            <Level_subject_tab state={this.props.state} id={this.props.state.row_level.row.id_niveau} row={this.props.state.row_level.row} />
          </div>
        </div>
        <div id="subject_doc"></div>
        </div>
      </React.Fragment>
    );}else{
      return (
        <React.Fragment>
          <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('subject_list')}
                
                    <span className="margin_top_5px"  
                          onClick={()=>this.close_tab()}>
                        <Close_button />
                    </span>
                </p>
                <hr />
          <div className="row">
            <div className="col-4">
              <div id="form_edit_subject">
                <Level_subject_form state={this.props.state}  />
              </div>
            </div>
            <div className="col-8" id="tab_edit_subject">
              <Level_subject_tab state={this.props.state} />
            </div>
          </div>
          <div id="subject_doc"></div>
        </React.Fragment>
      );
    }
  }
}
export default Subjects_details;
