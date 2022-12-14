import React, { useState, Component } from "react";
import Weeklyschedule_form from "./Weeklyschedule_form";
import Weeklyschedule_tab from "./Weeklyschedule_tab";
import ReactDOM from "react-dom";
import Level_config_menu from "./../Level_config_menu";
import Close_button from './../../../Close_button';
import Counterpart from "counterpart";

class Options extends Component {
  close_tab(){
    ReactDOM.render(
         <div className="subjects_table">
             <Level_config_menu row_level={this.props.state.row_level} />
        </div>,
    document.getElementById("Subjects_details")
  );
 }
  state = {
    weeks: [],
  };
  render() {
    var data = JSON.parse(sessionStorage.getItem("session"));
    console.log(data.type=="etudiant");
        if((data.type=="etudiant")||(data.type=="enseignant")){
    return (
      <React.Fragment>
                <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('weekly_schedule')}
                    <span className="margin_top_5px"  
                          onClick={()=>this.close_tab()}>
                        <Close_button />
                    </span>
                </p>
                <hr />
        <div className="row">
          <div className="col-12" id="tab">
            <Weeklyschedule_tab id={this.props.state.row_level.row.id_niveau} />
          </div>
        </div>
      </React.Fragment>
    );
  }else{
    return (
      <React.Fragment>
        <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('weekly_schedule')}
                    <span className="margin_top_5px"  
                          onClick={()=>this.close_tab()}>
                        <Close_button />
                    </span>
                </p>
                <hr />
        <div className="row">
          <div className="col-4">
            <div id="editForm">
              <Weeklyschedule_form row={this.props.state.row_level.row} id={this.props.state.row_level.row.id_niveau} />
            </div>
          </div>
          <div className="col-8" id="tab">
            <Weeklyschedule_tab id={this.props.state.row_level.row.id_niveau} />
          </div>
        </div>
      </React.Fragment>
    );
    }
  }
}
export default Options;
