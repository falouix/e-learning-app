import React, { Component } from "react";
import Documents_form from "./Documents_form";
import Documents_tab from "./Documents_tab";
class Documents_details1 extends Component {
  data = JSON.parse(sessionStorage.getItem("session"));
  state = {
    Periods: [],
  };
  render() {
    console.log("props documents side",this.props.state.row_level.row);
    if((this.data.type=="etudiant")||(this.data.type=="enseignant")){
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12" id="tab">
            <Documents_tab state={this.state} id={this.props.state.row_level.row.id_niveau} />
          </div>
        </div>
      </React.Fragment>
    );
  }else{
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-8" id="tab">
            <Documents_tab state={this.state} id={this.props.state.row_level.row.id_niveau} />
          </div>
          <div className="col-4">
            <div id="editForm">
              <Documents_form state={this.state} row={this.props.state.row_level.row} id={this.props.state.row_level.row.id_niveau}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
    }
  }
}
export default Documents_details1;
