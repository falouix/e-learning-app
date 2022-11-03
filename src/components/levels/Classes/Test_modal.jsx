import React from 'react'
import Close_button from './../../../Close_button'
import Counterpart from "counterpart";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Url from "../../../api/Apiurl";
import Axios from "axios";
import Main_chat from './chat/main_chat';
import Streaming from "./Streaming/Streaming";
import Joinstream from "./Streaming/JoinStream";

class Test_modal extends React.Component {
    data_session = JSON.parse(sessionStorage.getItem("session"));
    type="";
    state={
        Students:[]
    };

    componentDidMount(){
        console.log(this.data_session)
        var event_date=new Date(this.props.event_date);
        var today = new Date();
        if(event_date === today){
        if (this.props.row_level.row.order_niveau_g == 0) {
            this.type = "special"
            var posturl = Url.url + "Levels/getStudents_level_special.php";
        } else {
            var posturl = Url.url + "Levels/getStudents_level.php";
            this.type = "normal"
        }
        Axios
        .post(posturl,
            { level_id: this.props.row_level.row.id_niveau }
        )
        .then((res)=>{
            this.state.Students=res.data.Students;
            var Students_list=this.state.Students.map(
                ((item)=>{
                       return(
                           <li className="Students_listli">
                               {item.nom_etudiant}
                           </li>
                       )
                })
            )
         ReactDOM.render(
             <ul className="Students_listul">
             {Students_list}
             </ul>,
             document.getElementById("Student_list")
         );
        })
    }
    }
    render() {
        var event_date=new Date(this.props.event_date);
        var today = new Date();
        var Difference_In_Time = event_date - today; 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        var Difference_In_hours = Difference_In_Time / (1000 * 60);
        console.log("Difference_In_hours:",(Difference_In_hours)); 
        console.log("Difference_In_Days:",(Difference_In_Days));
        console.log("Difference_In_Time:",Difference_In_Time);
        if(this.data_session.type =="etudiant"){
            return (
                <div className="shadow_modal">
                 <div className="Modal_container">
                     <div className="Modal_header">
                     <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                     <span className="span_back_level">{this.props.event_title}</span>
                      <span className="margin_top_5px"  
                          onClick={()=> {
                            window.sessionStorage.setItem(
                                "seance",
                                0,
                              );
                            ReactDOM.render(
                            <></>,
                            document.getElementById("class_modal")
                            );
                            }} >
                          <Close_button />
                      </span>
                  </p>
                     </div>
                     <div className="Modal_body row">
                         <div className="video_container_fluid col-7">
                                <div className="video_container" id="stream_video"> 
                                        <h1>Joinstream</h1>
                                        <Joinstream />
                                </div>
                         </div>
                         <div className="message_container_fluid col-3">
                                <div className="message_container">
                                    <Main_chat/>
                                </div>
                         </div> 
                         <div className="contact_container col-2">
                                <h2 className="Students_listh2">
                                    {Counterpart.translate('messing_for_all')}
                                </h2>
                                <div id="Student_list"></div>
                         </div>
                     </div></div></div>
                    /////</div><div style={{background:this.props.bg_colors._def.ui.backgroundColor}}>
                    /////</div> text
                     /////</div><button
                     /////</div>     onClick={()=>{
                     /////</div>      console.log(this.props.bg_colors)
                     /////</div>}}
                    /////</div> >
                     /////</div>      color
                    /////</div> </button>
                    /////</div></div>
            )
        }else{
        return (
            <div className="shadow_modal">
             <div className="Modal_container">
                 <div className="Modal_header">
                 <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                 <span className="span_back_level">{this.props.event_title}</span>
                  <span className="margin_top_5px"  
                      onClick={()=> {
                        window.sessionStorage.setItem(
                            "seance",
                            0,
                          );
                        ReactDOM.render(
                        <></>,
                        document.getElementById("class_modal")
                        );
                        }} >
                      <Close_button />
                  </span>
              </p>
                 </div>
                 <div className="Modal_body row">
                     <div className="video_container_fluid col-7">
                            <div className="video_container" id="stream_video"> 
                            <h1>Streaming</h1>
                                    <Streaming />
                            </div>
                     </div>
                     <div className="message_container_fluid col-3">
                            <div className="message_container">
                                    <Main_chat/>
                            </div>
                     </div> 
                     <div className="contact_container col-2">
                            <h2 className="Students_listh2">
                                {Counterpart.translate('messing_for_all')}
                            </h2>
                            <div id="Student_list"></div>
                     </div>
                 </div></div></div>
                /////</div><div style={{background:this.props.bg_colors._def.ui.backgroundColor}}>
                /////</div> text
                 /////</div><button
                 /////</div>     onClick={()=>{
                 /////</div>      console.log(this.props.bg_colors)
                 /////</div>}}
                /////</div> >
                 /////</div>      color
                /////</div> </button>
                /////</div></div>
        )
    }
    }

    }
export default Test_modal;