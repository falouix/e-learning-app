import React, { useState, Component } from "react";

import Teacherstab from "./Teacherstab";
import Teachersform from "./Teachersform";
import ReactDOM from "react-dom";
class Teachers extends Component {
  state = {
    teachers: [],
  };
  render() {
    return (
      <React.Fragment>
        <div className="topbar"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <div id="editForm">
                <Teachersform state={this.state} />
              </div>
            </div>
            <div className="col-8" id="tab">
              <Teacherstab state={this.state} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Teachers;
