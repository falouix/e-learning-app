import React, { useState, Component } from "react";
import Studyperiods_form from "./Studyperiods_form";
import Studyperiods_tab from "./Studyperiods_tab";
import ReactDOM from "react-dom";
import Level_config_menu from "./../Level_config_menu";
import Counterpart from "counterpart";
import Close_button from './../../../Close_button';
class Studyperiods extends Component {
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
                <p className="name_level_title mrg_left_0 p_back_level">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('study_period_list')}
                </p>
                <hr />
        <div className="row">
          <div className="col-12" id="Studyperiods_tab">
            <Studyperiods_tab state={this.state} id={this.props.state.row_level.row.id_niveau} row={this.props.state.row_level.row} />
          </div>
        </div>
        </div>
      </React.Fragment>
    );}else{
      return (
        <React.Fragment>
          <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('study_period_list')}
                    <span className="margin_top_5px"  
                          onClick={()=>this.close_tab()}>
                        <Close_button />
                    </span>
                </p>
                <hr />
          <div className="row">
            <div className="col-4">
              <div id="Studyperiods_form">
                <Studyperiods_form state={this.state} row={this.props.state.row_level.row} id={this.props.state.row_level.row.id_niveau} />
              </div>
            </div>
            <div className="col-8" id="Studyperiods_tab">
              <Studyperiods_tab state={this.state} id={this.props.state.row_level.row.id_niveau} row={this.props.state.row_level.row} />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
export default Studyperiods;
