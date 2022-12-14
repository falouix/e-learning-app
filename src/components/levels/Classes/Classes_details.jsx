import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { formatDate } from '@fullcalendar/core'
import Close_button from './../../../Close_button';
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from '@fullcalendar/core/locales-all';
import arabLocales from '@fullcalendar/core/locales/ar';
import DownloadLink from "react-download-link";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FcDownload } from "react-icons/fc";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import ReactDOM from "react-dom";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Url from "../../../api/Apiurl";
//import enLocales from '@fullcalendar/core/locales/en';
import AddSeance from "./AddSeance";
import AddDoc_seance from "./AddDoc_seance";
import UpdateSeance from "./UpdateSeance";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CreateRoom from "../../../routes/CreateRoom";
import Room from "../../../routes/Room";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//jquery, popper.js libraries for bootstrap modal
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js'
import $ from 'jquery';
import Level_config_menu from "./../Level_config_menu";
import Streaming from "../../streaming/Streaming";
import Chat from '../../chat/Dashboard';
//import Doc from "./GetDocs";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
import axios from "axios";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
// webpack must be configured to do this
export default class Classes_Details extends React.Component {
  constructor() {
    super();
    this.state = {
      seances: [],
    };
  }
  close_tab(){
    ReactDOM.render(
         <div className="subjects_table">
             <Level_config_menu row_level={this.props.state.row_level} />
        </div>,
    document.getElementById("Subjects_details")
  );
 }
  componentDidMount() {
    console.log("classes details props", this.props.state.row_level.row.id_niveau);
    let initialSeances = [];
    fetch('https://uism-tn.com/api/get_seance.php?level_id=' + this.props.state.row_level.row.id_niveau)
      .then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
        initialSeances = data.seances.map((seance) => {
          return seance
        });
        this.setState({
          seances: initialSeances,
        });
      });
  }
  close_seance() {
    window.sessionStorage.setItem(
      "seance",
      0,
    );
    $(".modal-body-imags").html("");
    $(".modal-body-imags-label").html("");
    $(".modal-body-title-docs").html("");
    $(".stream_vid_container").html("");
    $(".stream_container").show();
  }
  formatEvents() {
    return this.state.seances.map(seance => {
      const { titre_seance, end, start } = seance

      return {
        title: seance.titre_seance + " - " + seance.nom_enseignant + " " + seance.prenom_enseignant + " ",
        start: seance.date_deb_seance,
        end: seance.date_deb_seancee,
        extendedProps: { ...seance }
      }
    })
  }
  render() {
    const datauser = JSON.parse(window.sessionStorage.session);
    if (datauser.type == "enseignant" || datauser.type == "user") {
      console.log("popup props", this.props);
      window.open('https://serv.uism-tn.com/curl_exec.php', '_blank');
      return (
        <React.Fragment>  
          <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('classes')}
                </p>
                <hr />        
          <Popup trigger={
            <button class="btnajout btn btn-success" onClick={console.log("aaaaa", this.props)}>
              <Translate content="new_seance" />
            </button>} position="right center">
            <div>  <AddSeance state={this.props.state} /></div>
          </Popup>
          <FullCalendar defaultView="dayGridMonth" locales={[arabLocales]} locale={Counterpart.getLocale()}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }} plugins={[dayGridPlugin, interactionPlugin]}
            eventClick={function (arg) {
              //  var Docs =  null;
              //  console.log(arg.event._def.extendedProps.id_seance);
              window.sessionStorage.setItem(
                "seance",
                arg.event._def.extendedProps.id_seance,
              );
              const Idseance = JSON.parse(window.sessionStorage.seance);
              const data_message = JSON.parse(window.localStorage.myData);
              let Docs = [];
              let initialDocs = [];
              //const Idseance = JSON.parse(window.sessionStorage.seance);

              fetch('https://uism-tn.com/api/get_seance_docs.php?seance=' + Idseance)
                .then(response => {
                  return response.json();
                }).then(data => {
                  const columns_docs = [
                    {
                      dataField: "nom_reelle_document",
                      text: Counterpart.translate("document_name"),
                      sort: true,
                    },
                    {
                      dataField: "added_date",
                      text: Counterpart.translate("date_documents"),
                      sort: true,
                    },
                    {
                      dataField: "",
                      text: <Translate type="text" content="actions" />,
                      sort: true,
                      formatter: (cell, row) => (
                        <div>
                          <button
                            id={row.id_documents}
                            className="btn btn-outline-success  btn-sm margin_left_6 "
                            onClick={() => { this.editfile(row) }}
                          >
                            <FiEdit />
                          </button>
                          <button
                            id={row.id_documents}
                            className="btn btn-outline-info  btn-sm margin_left_6 "
                            onClick={() => { this.downloadfile(row.id_documents) }}
                          >
                            <FcDownload />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm margin_left_6 "
                            onClick={() => { this.deletefile(row.id_documents) }}
                          >
                            <FiXOctagon />
                          </button>
                        </div>
                      ),
                    },
                  ];

                  console.log("data to put in the table", data);
                  console.log("columns", columns_docs);

                  ReactDOM.render(
                    <React.Fragment>
                      
            <p className="name_level_title mrg_left_0 p_back_level">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>test</span>
                    /{Counterpart.translate('classes')}
                </p>
                <hr />
                      <div className="row" >
                        <div className="col-8">
                          <ToolkitProvider keyField="name" data={data.seance_docs} columns={columns_docs}
                            search
                          >
                            {(props) => (<div><BootstrapTable {...props.baseProps} pagination={paginationFactory()} /></div>)}
                          </ToolkitProvider>
                        </div>
                        <div className="col-4"><AddDoc_seance id={Idseance} /></div>
                      </div>
                    </React.Fragment>,
                    document.getElementById("tab_seance_docs")
                  );


                  /* initialDocs = data.seance_docs.map((doc) => {
 
                     if (doc.nom_documents.includes('.pdf')) {
                       $(".modal-body-imags").append("<a href='https://uism-tn.com/api/uploads/" + doc.nom_documents + "' target='_blank'><img width='200px' height = '180px'   src= https://uism-tn.com/api/uploads/pdf.png></a>");
                       $(".modal-body-imags-label").append("<label style='width:200px'>" + doc.nom + "</label>");
                     } else {
                       $(".modal-body-imags").append("<a href='https://uism-tn.com/api/uploads/" + doc.nom_documents + "' target='_blank'><img width='200px' height = '180px'   src= https://uism-tn.com/api/uploads/" + doc.nom_documents + "></a>");
                       $(".modal-body-imags-label").append("<label style='width:200px'>" + doc.nom + "</label>");
                     }
                   });*/
                  //get doc of every class
                  var posturl = Url.url + "Levels/Documents/getDocuments_class.php";
                  /* axios
                     .post(posturl,
                       {
                         id: Idseance
                       }
                     )
                     .then((res) => {
                       console.log("data back", res.data.doc);
                       ReactDOM.render(
                         <React.Fragment>
                           <ToolkitProvider
                             keyField="name"
                             data={res.data.doc}
                             columns={this.columns}
                             search
                           >
                             {(props) => (
                               <div>
                                 <BootstrapTable
                                   {...props.baseProps}
                                   pagination={paginationFactory()}
                                 />
                               </div>
                             )}
                           </ToolkitProvider>
                         </React.Fragment>,
                         document.getElementById("tab_seance_docs")
                       );
                     });*/
                  $('#myModal').modal({ backdrop: 'static', keyboard: false });
                  $(".modal-body-title-docs").html("<h3 >" + Counterpart.translate('documents_seance') + "</h3>");
                  //$(".modal-body-imags").html("<div id='tab_seance_doc' > </div>");
                  if (Counterpart.getLocale() == "ar") {
                    $(".seanceheader").html("<h4>" + Counterpart.translate('seance') + ": " + arg.event._def.extendedProps.date_deb_seance + " " + Counterpart.translate('subject') + ": " + arg.event._def.extendedProps.nom_matiere + " " + Counterpart.translate('proffesor') + " : " + arg.event._def.extendedProps.nom_enseignant + "  " + arg.event._def.extendedProps.prenom_enseignant + "</h4>");
                  } else {
                    $(".seanceheader").html("<h4> Seance: " + arg.event._def.extendedProps.date_deb_seance + " Matiere: " + arg.event._def.extendedProps.nom_matiere + " Proffessor : " + arg.event._def.extendedProps.nom_enseignant + "  " + arg.event._def.extendedProps.prenom_enseignant + "</h4>");
                  }
                });
              if (Idseance != 0) {
                fetch("https://uism-tn.com/api/ListeUser.php?seance=" + Idseance + "&type=" + JSON.parse(sessionStorage.session).type)
                  .then(res => res.json())
                  .then(
                    (result) => {
                      localStorage.setItem('myData', JSON.stringify(result));
                    },
                  )
                fetch('https://uism-tn.com/api/get_seance_validity.php?id_seance=' + Idseance)
                  .then(response => {
                    return response.json();
                  }).then(data => {
                    console.log(data.filename);
                    if (data.Validity == 0 & data.filename != '') {
                      var validity = data.filename;
                      var vidsrc = "https://uism-tn.com/api/uploads_Stream/" + validity;
                      /* <video controls style={{height: 500, width: 500}} id="uservid"  src={userVideo} />*/

                      $(".stream_container").hide();
                      $(".stream_vid_container").append("<video controls width='500px' height = '500px' id='seancervid'  src=https://uism-tn.com/api/uploads_Stream/" + validity + " ></video>");
                    }
                  });
              }
            }
            }
            events={this.formatEvents()}
          />
          <div class="modal" id="myModal">
            <div class="modal-dialog modal-width">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class=" seanceheader modal-title align-center"></h4>
                  <button type="button" class="close" onClick={this.close_seance} data-dismiss="modal">&times;</button>
                </div>
                <Popup trigger={<button class="btnajout btn btn-success"><Translate content="update_seance" /> </button>} position="right center">
                  <div>  <UpdateSeance /></div>
                </Popup>
                <div class="modal-body-title text-center">
                </div>
                <div class="modal-body text-center">

                  <div class="col-12">
                    <div class="stream_container col-5"> <Streaming /></div>
                    <div class="chat_container col-7"> <Chat /></div>
                    <div class="stream_vid_container col-5">
                    </div>
                  </div>
                </div>
                <div class="modal-body-title-docs text-center">
                </div>
                <div class=" modal-body-imags ">
                </div>
                <div class=" modal-body-imags-label ">
                </div>
                <div id="tab_seance_docs">
                </div>
                <div class="modal-footer">
                  <button class="btn btn-danger" onClick={this.close_seance} data-dismiss="modal"><Translate content="close" /></button>
                </div>
              </div>
            </div>
          </div>


        </React.Fragment >
      );


    } else {

      return (
        <React.Fragment>
            <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('classes')}
                    <span className="margin_top_5px"  
                          onClick={()=>this.close_tab()}>
                        <Close_button />
                    </span>
                </p>
                <hr />
          <FullCalendar defaultView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay'
            }} locales={[arabLocales]} locale={Counterpart.getLocale()} plugins={[dayGridPlugin, interactionPlugin]}
            eventClick={function (arg) {
              //  var Docs =  null;


              //  console.log(arg.event._def.extendedProps.id_seance);
              window.sessionStorage.setItem(
                "seance",
                arg.event._def.extendedProps.id_seance,

              );
              const Idseance = JSON.parse(window.sessionStorage.seance);
              let Docs = [];
              let initialDocs = [];
              //const Idseance = JSON.parse(window.sessionStorage.seance);
              fetch('https://uism-tn.com/api/get_seance_docs.php?seance=' + Idseance)
                .then(response => {
                  return response.json();
                }).then(data => {
                  initialDocs = data.seance_docs.map((doc) => {

                    if (doc.nom_documents.includes('.pdf')) {
                      $(".modal-body-imags-label").append("<label style='width:200px'>aaa</label>");
                      $(".modal-body-imags").append("<a href='https://uism-tn.com/api/uploads/" + doc.nom_documents + "' target='_blank'><img width='200px' height = '180px'   src= https://uism-tn.com/api/uploads/pdf.png></a>");
                      $(".modal-body-imags-label").append("<label style='width:200px'>" + doc.nom + "</label>");
                    } else {
                      $(".modal-body-imags").append("<a href='https://uism-tn.com/api/uploads/" + doc.nom_documents + "' target='_blank'><img width='200px' height = '180px'   src= https://uism-tn.com/api/uploads/" + doc.nom_documents + "></a>");
                      $(".modal-body-imags-label").append("<label style='width:200px'>" + doc.nom + "</label>");

                    }
                  });
                  $('#myModal').modal({ backdrop: 'static', keyboard: false });

                  $(".modal-body-title-docs").html("<h3 >" + Counterpart.translate('documents_seance') + "</h3>");
                  if (Counterpart.getLocale() == "ar") {
                    $(".seanceheader").html("<h4>" + Counterpart.translate('seance') + ": " + arg.event._def.extendedProps.date_deb_seance + " " + Counterpart.translate('subject') + ": " + arg.event._def.extendedProps.nom_matiere + " " + Counterpart.translate('proffesor') + " : " + arg.event._def.extendedProps.nom_enseignant + "  " + arg.event._def.extendedProps.prenom_enseignant + "</h4>");

                  } else {
                    $(".seanceheader").html("<h4> Seance: " + arg.event._def.extendedProps.date_deb_seance + " Matiere: " + arg.event._def.extendedProps.nom_matiere + " Proffessor : " + arg.event._def.extendedProps.nom_enseignant + "  " + arg.event._def.extendedProps.prenom_enseignant + "</h4>");

                  }
                });
              if (Idseance != 0) {
                // alert(Idseance);
                fetch('https://uism-tn.com/api/get_seance_validity.php?id_seance=' + Idseance)
                  .then(response => {
                    return response.json();
                  }).then(data => {
                    console.log(data.filename);
                    if (data.Validity == 0 & data.filename != '') {
                      var validity = data.filename;
                      var vidsrc = "https://uism-tn.com/api/uploads_Stream/" + validity;
                      /* <video controls style={{height: 500, width: 500}} id="uservid"  src={userVideo} />*/
                      $(".stream_vid_container").empty();
                      $(".stream_container").hide();
                      $(".stream_vid_container").append("<video controls width='500px' height = '500px' id='seancervid'  src=https://uism-tn.com/api/uploads_Stream/" + validity + " ></video>");
                    }
                  });
              } else {
                $(".stream_container").show();
                $(".stream_vid_container").empty();
              }
            }}
            events={this.formatEvents()}
          />
          <div class="modal" id="myModal">
            <div class="modal-dialog modal-width">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="seanceheader modal-title align-center"></h4>
                  <button type="button" class="close" onClick={this.close_seance} data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body-title text-center">
                </div>
                <div class="modal-body text-center">
                  <div class="col-12">
                    <div class="stream_container col-6"> <Streaming /></div>
                    <div class="chat_container col-6"> <Chat /></div>
                    <div class="stream_vid_container col-5">
                    </div>
                  </div>
                </div>
                <div class="modal-body-title-docs text-center">
                </div>
                <div class=" modal-body-imags ">
                </div>
                <div class=" modal-body-imags-label ">
                </div>
                <div class="modal-footer">
                  <button class="btn btn-danger" onClick={this.close_seance} data-dismiss="modal"><Translate content="close" /></button>

                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );


    }



  }



}