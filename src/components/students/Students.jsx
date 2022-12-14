import React, { useState, Component } from "react";
import Studentstab from "./Studentstab";
import Studentsform from "./Studentsform";
import ReactDOM from "react-dom";
class Students extends Component {
  state = {
    students: [],
  };
  render() {
    return (
      <React.Fragment>
        <div className="topbar"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <div id="editForm">
                <Studentsform state={this.state} />
              </div>
            </div>
            <div className="col-8" id="tab">
              <Studentstab state={this.state} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Students;
