import React from 'react'
import FullCalendar from '@fullcalendar/react'
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid'
import Close_button from './../../../Close_button'
import Counterpart from "counterpart";
import ReactDOM from "react-dom";
import AddClass_modal from "./addClass_modal";
import Test_modal from "./Test_modal";
import {AddClass_button} from "./addClass_modal";
import Url from "../../../api/Apiurl";
import Axios from "axios";
import Level_config_menu from "./../Level_config_menu";
//import "https://uism-tn.com/api/test.css";
class Studyperiods extends React.Component {
  close_tab(){
    ReactDOM.render(
         <div className="subjects_table">
             <Level_config_menu row_level={this.props.state.row_level} />
        </div>,
    document.getElementById("Subjects_details")
  );
 }
  state = {
    Classes: [],
  };
  handleDateClick=()=>{
    console.log('date clikced');
  } 
  componentDidMount(){
    //if the user is teacher so we have to show just the classes that belong to him
    let sessionData=JSON.parse(window.sessionStorage.getItem("session"));
    console.log(sessionData);
    var posturl = "";
      if(sessionData.type=="enseignant"){
        console.log(sessionData);
        posturl= Url.url + "Levels/Classes/getClasses.php?type='enseignant'&idTeacher="+sessionData.id_enseignant;
      }else{
        console.log("this is not a teacher");
        posturl= Url.url + "Levels/Classes/getClasses.php";
      }
    
    Axios
      .post(posturl, {
        level_id: this.props.state.row_level.row.id_niveau
      }
      )
      .then((res) => {
        res.data.Classes.map((item, i) => { 
          var    classc="un_"+ item.colorbg_matiere.slice(1, item.colorbg_matiere.length);
          this.state.Classes.push({
            classId: item.id_seance,
            title: item.titre_seance +" ("+item.nom_enseignant+")",
            date: item.date_deb_seance,
            color: item.colorbg_matiere,
            className : classc,
            extendedProps: { ...item }
          })                
       })
       ReactDOM.render(
        <div><div id="style_itos"></div>
        <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                 <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                  /{Counterpart.translate('subject_list')}
                  <span className="margin_top_5px"  
                      onClick={()=>this.close_tab()} >
                      <Close_button />
                  </span>
              </p>
      <FullCalendar
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }} 
          locale= 'ar'
        events={this.state.Classes}
        eventClick={(index)=>{
          window.sessionStorage.setItem(
            "seance",
            index.event._def.extendedProps.id_seance,
          );
          ReactDOM.render(
            <Test_modal 
              event_title={index.event.title} 
              bg_colors={index.event} 
              event_date={index.event._def.extendedProps.date_deb_seance}
              levelId={this.props.state.row_level.row.id_niveau}
              row_level={this.props.state.row_level} 
            />,
            document.getElementById("class_modal")
          );
        }}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
      /></div>,
      document.getElementById("schedule")
      );
      Axios
      .post("https://uism-tn.com/api/test.css.php", {
        state: this.state.Classes
      }
      )
      .then((res) => {
       ReactDOM.render(
              <style>{res.data}</style>,
              document.getElementById("style_itos")
        )
      });
      });
  }
  
  render() {
      return (
        <>
          <div id="class_modal">
          </div>
          <div id="schedule">
          </div>
        </>
      )
    }
}
export default Studyperiods;
