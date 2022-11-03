import React, { useState, Component } from "react";
import "./assets/css/Users.css";
import Userstab from "./Userstab";
import Usersform from "./Usersform";
import ReactDOM from "react-dom";

class Users extends Component {
  state = {
    users: [],
  };

  //render form

  //UPDATE
  //edit

  //save_update

  //add users

  //RENDER

  render() {
    return (
      <React.Fragment>
        <div className="topbar"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <div id="editForm">
                <Usersform state={this.state} />
              </div>
            </div>
            <div className="col-8" id="tab">
              <Userstab state={this.state} edit={this.edit} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Users;
