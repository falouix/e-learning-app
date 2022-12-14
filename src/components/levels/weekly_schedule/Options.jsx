import React, { useState, Component } from "react";
import Weeklyschedule_form from "./Weeklyschedule_form";
import Weeklyschedule_tab from "./Weeklyschedule_tab";
import ReactDOM from "react-dom";
import Axios from "axios";
import Translate from "react-translate-component";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Avatar from "@material-ui/core/Avatar";
import Counterpart from "counterpart";


class Options extends Component {
    
    getoptions(){
        
        console.log("get option is runing");
    Axios.post("https://uism-tn.com/api/Levels/weekly_schedule/getSubjects.php",{
     
        id_niveau:"3"
      })
      .then((res)=>{
        if(this.props.value != "not seted"){
          this.items1=<option >
             {this.props.value}
           </option>;
      }
        this.items=res.data.Subjects.map((item, index) => {
            console.log(item.nom_matiere);
            
               if(this.props.value!=item.nom_matiere){
              return (
                <option value={item.id_matiere_enseignant} key={index}>
                  {item.nom_matiere}
                </option>
              )}
            });
          console.log("options",this.items)
          ReactDOM.render(
            <select id="matieres" class="form-control" ref={(val) => (this.Subject = val)} 
            onChange={()=>{
                this.props.state.id_me=this.Subject.value;
                console.log(this.props.state.id_me);
            }}
                       >
                         
                         {this.items1} 
                         {this.items}</select>,
            document.getElementById("options")
          );
          this.props.state.id_me=this.Subject.value;
        });}
  state = {
    weeks: [],
  };
  items=<option></option>;
  items1=<option>choose subject</option>;
 
           
      
   
  render() {
    console.log("from ption ",this.props);
    
    this.getoptions();
    
    return (
        
    <div id="options"></div>
    )
  }
}
export default Options;
