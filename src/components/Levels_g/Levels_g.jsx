import React, { useState, Component } from "react";
import Levelsgtab from "./Levelsgtab"
import Levelsgform from "./Levelsgform"

class Levels_g extends Component {
  state = {
    Levels_g: [],
  };
  render() {
    return (
      <React.Fragment>
        <div className="topbar"></div>
        <div className="container-fluid" id="details_level">
          <div className="row">
            <div className="col-4">
              <div id="editForm">
                <Levelsgform state={this.state} />
              </div>
            </div>
            <div className="col-8" id="tab">
              <Levelsgtab state={this.state} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Levels_g;
