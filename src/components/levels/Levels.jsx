import React, {  Component } from "react";
import Levelstab from "./Levelstab";
import Levels_list from "./Levels_list";
import Levelform from "./Levelsform";
class Levels extends Component {
   data = JSON.parse(sessionStorage.getItem("session"));
  state = {
    levels: [], 
  };
  render() {
    if((this.data.type=="etudiant")||(this.data.type=="enseignant")){
    return (
      <React.Fragment>
        <div className="topbar"></div>
        <div className="container-fluid" id="details_level">
              <div id="tab">
                <Levelstab state={this.state} />
            </div>
        </div>
      </React.Fragment>
    );
  }else{
    return (
      <React.Fragment>
        <div className="topbar"></div>
        <div className="container-fluid" id="details_level">
          <div className="row">
            <div className="col-4">
              <div id="editForm">
                <Levelform state={this.state} />
              </div>
            </div>
            <div className="col-8" >
              <div id="tab">
                <Levelstab state={this.state} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>);
    }
  }
}
export default Levels;
