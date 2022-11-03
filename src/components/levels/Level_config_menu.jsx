import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import Counterpart from "counterpart";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Subjects_details from "./subjects/Subjects_details";
import Documents_details from "./document/Documents_details";
import Levels from "./../levels/Levels";
import Close_button from './../../Close_button';
import Levelstab from "./../levels/Levelstab";
import Studyperiods from "./Study_periods/Studyperiods";
import Students_tab from "./Students/Students_tab";
import Classes_details from "./Classes/Classes_details";
import Classes_calendar from "./Classes/Classes_calendar";

import Weekly_schedule from "./weekly_schedule/weekly_schedule";
class Level_config_menu extends Component {
   data = JSON.parse(sessionStorage.getItem("session"));
   //close levels detail
   close_level_details(){
        ReactDOM.render(
            <React.Fragment>
                <div id="Subjects_details">
                <Levels/>
                </div>
                </React.Fragment>,
            document.getElementById("Subjects_details")
          );
   }
   //render Subjects details
   Subjects_render(){
    //console.log(this.props.row_level);
    ReactDOM.render(
        <Router>
          <Route path="/app" exact>
        <div className="col-12" id="tab_level">
            <Subjects_details state={this.props} />
        </div></Route></Router>,
        document.getElementById("Subjects_details")
      );
   }
   //render Documents details
   documents_level_render(){
    //console.log(this.props.row_level);
    ReactDOM.render(
        <Router>
          <Route path="/app" exact>
        <div className="col-12" id="tab_level">
            <Documents_details state={this.props} />
        </div></Route></Router>,
        document.getElementById("Subjects_details")
      );
   }
   //render study_periods details
   study_periods_render(){
    ReactDOM.render(
        <Router>
          <Route path="/app" exact>
        <div className="col-12" id="tab_level">
            <Studyperiods state={this.props} />
        </div></Route></Router>,
        document.getElementById("Subjects_details")
      );
   }
   //render students details
   Students_render(){
    ReactDOM.render(
        <Router>
          <Route path="/app" exact>
        <div className="col-12" id="tab_level">
            <Students_tab state={this.props} />
        </div></Route></Router>,
        document.getElementById("Subjects_details")
      );
   }
   //render classes details
   Seances_render(){
    ReactDOM.render(
        <Router>
          <Route path="/app" exact>
        <div className="col-12" id="tab_level">
            <Classes_calendar state={this.props} />
        </div></Route></Router>,
        document.getElementById("Subjects_details")
      );
   }
   //render weekly_schedule_render()
   weekly_schedule_render(){
    ReactDOM.render(
        <Router>
          <Route path="/app" exact>
        <div className="col-12" id="tab_level">
            <Weekly_schedule state={this.props} />
        </div></Route></Router>,
        document.getElementById("Subjects_details")
      ); 
   }
   //render this components
  render() {
    var data = JSON.parse(sessionStorage.getItem("session"));
    console.log("Type from Menu :",data.type);
    //if this user is student
    if(data.type=="etudiant"){
        return (
            <div id="Subjects_details" >
                <h1 className="name_level_title mrg_left_0 p_back_level level_name_title">{this.props.row_level.row.nom_niveau_g}</h1>
                <hr/>
                <hr className="hr1_level"/>
                <div className="row mrgn-top-75" >
                <div className="col-4 col-sm-4 btn">
                    <div className="btn-menu" onClick={()=>{this.study_periods_render()}}> 
                    <img className="btn-menu-img" src="https://cdn1.iconfinder.com/data/icons/business-and-finance-2-12/512/Business_finance_2-08-512.png"/>
                    <br/>{Counterpart.translate('study_periods')}
                    </div> 
                </div>
                <div className="col-4 col-sm-4 btn">
                    <div className="btn-menu" onClick={()=>{this.documents_level_render()}}> 
                    <img className="btn-menu-img" src="https://agr-city.ru/userfiles/images/dokumenty_poisk.png"/>
                    <br/>{Counterpart.translate('documents_level')}
                    </div> 
                </div>
                <div className="col-4 col-sm-4 btn">
                    <div className="btn-menu" onClick={()=>{this.Subjects_render()}}> 
                    <img className="btn-menu-img" src="https://www.freelogovectors.net/wp-content/uploads/2015/06/books-3d-png-icons-3.png"/>
                    <br/>{Counterpart.translate('Subjects')}
                    </div> 
                </div>
            </div>
            <hr/>
            <div className="row">
            <div className="col-4 col-sm-4 btn"></div>
                <div className="col-4 col-sm-4 btn">
                    <div className="btn-menu" onClick={()=>{this.weekly_schedule_render()}}> 
                    <img className="btn-menu-img" src="https://cdn0.iconfinder.com/data/icons/fitness-filled-color/300/185934521Untitled-3-512.png"/>
                    <br/>{Counterpart.translate('weekly_schedule')}
                    </div> 
                </div>
                <div className="col-4 col-sm-4 btn">
                    <div className="btn-menu" onClick={()=>{this.Seances_render()}}> 
                    <img className="btn-menu-img" src="https://cdn0.iconfinder.com/data/icons/business-and-finance-166/512/Calendar-512.png"/>
                    <br/>{Counterpart.translate('seances')}
                    </div> 
                </div>
            </div>
            <hr/>
            <div className="col-12 col-sm-12 btn">
            <button 
            className="btn btn-outline-danger"
            onClick={()=>{this.close_level_details()}}
            >
            {Counterpart.translate('close')}
            </button>
                </div>
            <hr className="hr1_level"/>
            </div>
        );
    }
    return (
        <div id="Subjects_details" >
            <h1 className="name_level_title mrg_left_0 p_back_level level_name_title">
                {this.props.row_level.row.nom_niveau_g}
                <span className="margin_top_5px"  
                          onClick={()=>{this.close_level_details()}}>
                        <Close_button />
                    </span>
            </h1>
            <hr/>
            <hr className="hr1_level"/>
            <div className="row mrgn-top-75" >
            <div className="col-4 col-sm-4 btn">
                <div className="btn-menu" onClick={()=>{this.study_periods_render()}}> 
                <img className="btn-menu-img" src="https://cdn1.iconfinder.com/data/icons/business-and-finance-2-12/512/Business_finance_2-08-512.png"/>
                <br/>{Counterpart.translate('study_periods')}
                </div> 
            </div>
            <div className="col-4 col-sm-4 btn">
                <div className="btn-menu" onClick={()=>{this.documents_level_render()}}> 
                <img className="btn-menu-img" src="https://agr-city.ru/userfiles/images/dokumenty_poisk.png"/>
                <br/>{Counterpart.translate('documents_level')}
                </div> 
            </div>
            <div className="col-4 col-sm-4 btn">
                <div className="btn-menu" onClick={()=>{this.Subjects_render()}}> 
                <img className="btn-menu-img" src="https://www.freelogovectors.net/wp-content/uploads/2015/06/books-3d-png-icons-3.png"/>
                <br/>{Counterpart.translate('Subjects')}
                </div> 
            </div>
        </div>
        <hr/>
        <div className="row">
        <div className="col-4 col-sm-4 btn">
                <div className="btn-menu" onClick={()=>{this.Students_render()}}> 
                <img className="btn-menu-img" src="https://iconbug.com/download/size/512/icon/5246/3d-user-folder/"/>
                <br/>{Counterpart.translate('Students')}
                </div> 
            </div>
            <div className="col-4 col-sm-4 btn">
                <div className="btn-menu" onClick={()=>{this.weekly_schedule_render()}}> 
                <img className="btn-menu-img" src="https://cdn0.iconfinder.com/data/icons/fitness-filled-color/300/185934521Untitled-3-512.png"/>
                <br/>{Counterpart.translate('weekly_schedule')}
                </div> 
            </div>
            <div className="col-4 col-sm-4 btn">
                <div className="btn-menu" onClick={()=>{this.Seances_render()}}> 
                <img className="btn-menu-img" src="https://cdn0.iconfinder.com/data/icons/business-and-finance-166/512/Calendar-512.png"/>
                <br/>{Counterpart.translate('seances')}
                </div> 
            </div>
        </div>
        <hr/>
        <div className="col-12 col-sm-12 btn">
        <button 
        className="btn btn-outline-danger"
        onClick={()=>{this.close_level_details()}}
        >
        {Counterpart.translate('close')}
        </button>
            </div>
        <hr className="hr1_level"/>
        </div>
    );
     
  }
}
export default Level_config_menu;
