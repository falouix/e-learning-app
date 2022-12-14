import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import Popup from 'reactjs-popup';
import Url from "../../../api/Apiurl";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FcDownload } from "react-icons/fc";
import Level_config_menu from "./../Level_config_menu";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import Translate from "react-translate-component";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Counterpart from "counterpart";
import Close_button from './../../../Close_button';
const { SearchBar } = Search;
var type = "";
var etat_payment = "";
class Students_tab extends Component {
    close_tab(){
        ReactDOM.render(
             <div className="subjects_table">
                 <Level_config_menu row_level={this.props.state.row_level} />
            </div>,
        document.getElementById("Subjects_details")
      );
     }
    //submit the popup form
    change_payment(type, etat_payment, row) {
        console.log(row.id_guest);
        console.log(type);
        console.log(etat_payment);
        var url = "";
        if (type == "special") {
            url = "https://uism-tn.com/api/ValideMondat_special.php?etats_payment=" + etat_payment + "&id_niveau_etudiant=" + row.id_guest;
        } else {
            url = "https://uism-tn.com/api/ValideMondat.php?etats_payment=" + etat_payment + "&id_niveau_etudiant=" + row.id_niveau_etudiant;
        }
        Axios.post(url, { // receive two parameter endpoint url ,form data 
        })
            .then(res => {
                var list = document.getElementById("popup-root");
                list.remove()

                document.getElementById("simple-tab-0").click();
                setTimeout(() => {
                    document.getElementById("simple-tab-3").click();
                }, 400);

            }).catch(function (error) {
                console.log(error);
            });

    }
    /*contactSubmit(e, row, data, type) {
         e.preventDefault();
         var etats_payment = document.getElementById("monselect").value
         var id_niveau_etudiant = document.getElementById("id_niveau_etudiant").value
         var url = "";
         if (type == "special") {
             url = "https://uism-tn.com/api/ValideMondat.php?etats_payment=" + etats_payment + "&id_niveau_etudiant=" + id_niveau_etudiant;
         } else {
             url = "https://uism-tn.com/api/ValideMondat.php?etats_payment=" + etat_payment + "&id_niveau_etudiant=" + id_niveau_etudiant;
         }
         Axios.post(url, { // receive two parameter endpoint url ,form data 
         })
             .then(res => {
                 var list = document.getElementById("popup-root");
                 list.remove()
 
                 document.getElementById("simple-tab-0").click();
                 setTimeout(() => {
                     document.getElementById("simple-tab-3").click();
                 }, 400);
 
             }).catch(function (error) {
                 console.log(error);
             });
     }*/
    //display popup
    show(row) {
        var list = document.getElementById("popup-root");
        list.remove()
        document.getElementById("simple-tab-0").click();
        setTimeout(() => {
            document.getElementById("simple-tab-3").click();
        }, 400);
    }
    Students =[];
    
    data = JSON.parse(sessionStorage.getItem("session"));
    
    render() {
        console.log(this.data.type);
        if(this.data.type=="enseignant"){
            this.Students= [
                {
                    dataField: "nom_etudiant",
                    text: <Translate type="text" content="Name" />,
                    sort: true,
                },
                {
                    dataField: "prenom_etudiant",
                    text: <Translate type="text" content="prenom" />,
                    sort: true,
                },
                {
                    dataField: "tel_etudiant",
                    text: <Translate type="text" content="tel" />,
                    sort: true,
                },
                {
                    dataField: "mail_etudiant",
                    text: <Translate type="text" content="mail" />,
                    sort: true,
                },
            ];
        }else{
            this.Students= [
                {
                    dataField: "etat_payment",
                    text: <Translate type="text" content="etat_payment" />,
                    sort: true,
                    formatter: (cell, row) => (
                        <div className={'color_etat_payment_' + row.etat_payment}><span className={'color_span_' + row.etat_payment} ><span className="hidden">a</span><input type="checkbox" className="input_check" checked /></span></div>
                    ),
                },
                {
                    dataField: "nom_etudiant",
                    text: <Translate type="text" content="Name" />,
                    sort: true,
                },
                {
                    dataField: "prenom_etudiant",
                    text: <Translate type="text" content="prenom" />,
                    sort: true,
                },
                {
                    dataField: "cin_etudiant",
                    text: <Translate type="text" content="cin" />,
                    sort: true,
                },
                {
                    dataField: "tel_etudiant",
                    text: <Translate type="text" content="tel" />,
                    sort: true,
                },
                {
                    dataField: "mail_etudiant",
                    text: <Translate type="text" content="mail" />,
                    sort: true,
                },
                {
                    dataField: "num_mondat",
                    text: <Translate type="text" content="num_mondat" />,
                    sort: true,
                },
                {
                    dataField: "type_payment",
                    text: <Translate type="text" content="type_payment" />,
                    sort: true,
                },
                {
                    dataField: "configuration",
                    text: <Translate type="text" content="configuration" />,
                    sort: true,
                    formatter: (cell, row) => (
                        <div className={row.num_mondat !== 0 ? 'Div_btn' : 'hidden'}>
                            <Popup ref={this.ref} trigger={
                                <button
                                    id="myBtn"
                                    className={"div_btn_edit_" + row.num_mondat + "  btn btn-outline-success btn-sm margin_left_6"}
                                >
                                    <FiEdit />
                                </button>
                            } position="right center">
                                <div>
                                    <fieldset className="border-form p-3 rounded">
                                        <legend className={`rounded p-1 text-center login_form`}>
                                            التحقق من الدفع
                                  </legend>
                                        <div className="div_close" onClick={this.show}><img src="https://uism-tn.com/api/img/close.svg" alt="close" width="20" /></div>
                                        <form name="paymentform" className="contactform" noValidate autoComplete="off" >
                                            <div className="col-md-6 inpu_forms">
                                                <div className="form-group hidden">
                                                    <label ><Translate type="text" content="id_niveau_etudiant" /> :</label>
                                                    <input id="id_niveau_etudiant" value={row.id_niveau_etudiant} className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <label ><Translate type="text" content="Name" /> :</label>
                                                    <span className="form-control">{row.nom_etudiant}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label ><Translate type="text" content="prenom" /> :</label>
                                                    <span className="form-control">{row.prenom_etudiant}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label ><Translate type="text" content="cin" /> :</label>
                                                    <span className="form-control">{row.cin_etudiant}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label ><Translate type="text" content="tel" /> :</label>
                                                    <span className="form-control">{row.tel_etudiant}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 inpu_forms">
                                                <div className="form-group">
                                                    <label ><Translate type="text" content="mail" /> :</label>
                                                    <span className="form-control">{row.mail_etudiant}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label ><Translate type="text" content="num_mondat" /> :</label>
                                                    <span className="form-control">{row.num_mondat}</span>
                                                </div>
                                                <div className="form-group">
                                                    <label ><Translate type="text" content="type_payment" /> :</label>
                                                    <span className="form-control">{row.type_payment == 1 ? 'تحويل أموال' : ' حوالة بريدية'}</span>
                                                </div>
                                                <div className={row.File ? 'form-group' : 'hidden'}>
                                                    <label ><Translate type="text" content="file" /> :</label>
                                                    <a href={"https://uism-tn.com/api/" + row.File} target="_blank" download="mondat">
                                                        <img src={"https://uism-tn.com/api/" + row.File} alt="mondat" height="350" />
                                                    </a>
                                                </div>
                                                <div className="form-group">
                                                    <label ><Translate type="text" content="validation" /> :</label>
                                                    <select className="form-control" id="monselect"
                                                        onChange={e => etat_payment = e.target.value}>
                                                        <option value="0" className={row.etat_payment} defaultValue selected={row.etat_payment == 1 ? 'selected' : ''} disabled>حدد حالة الدفع</option>
                                                        <option value="2" className={row.etat_payment} selected={row.etat_payment == 2 ? 'selected' : ''}>فعال</option>
                                                        <option value="3" className={row.etat_payment} selected={row.etat_payment == 3 ? 'selected' : ''}>في الإنتظار</option>
                                                        <option value="4" className={row.etat_payment} selected={row.etat_payment == 4 ? 'selected' : ''}>غير فعال</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                            </div>
                                        </form>
                                        <button
                                            size="lg"
                                            className="btn btn-outline-primary"
                                            onClick={() => {
                                                this.change_payment(type, etat_payment, row);
                                                //console.log(type);
                                                //console.log(etat_payment);
                                            }}
                                        >
                                            Valider
                                      </button>
        
                                    </fieldset>
                                </div>
                            </Popup>
                        </div>
                    ),
                },
            ];
        }

        //check if session is special or not!
        if (this.props.state.row_level.row.order_niveau_g == 0) {
            type = "special"
            var posturl = Url.url + "Levels/getStudents_level_special.php";
        } else {
            var posturl = Url.url + "Levels/getStudents_level.php";
            type = "normal"
        }
        Axios
            .post(posturl,
                { level_id: this.props.state.row_level.row.id_niveau }
            )
            .then(
                function ({ data }) {
                    console.log("students data", data);
                    const keys = Object(data.Students)
                    for (const key of keys) {
                        if (key.type_payment == 1) {
                            key.type_payment = 'حوالة بريدية'
                        } else if (key.type_payment == 2) {
                            key.type_payment = 'تحويل أموال '
                        }
                        data.Students = keys
                    }
                    ReactDOM.render(
                        <React.Fragment>
                            <ToolkitProvider
                                keyField="name"
                                data={data.Students}
                                columns={this.Students}
                                search
                            >
                                {(props) => (
                                    <div id="students_table">
                                        <SearchBar {...props.searchProps} className="bckgr" />
                                        <BootstrapTable
                                            {...props.baseProps}
                                            pagination={paginationFactory()}
                                        />
                                    </div>
                                )}
                            </ToolkitProvider>
                        </React.Fragment>,
                        document.getElementById("students_table")
                    );
                }.bind(this)
            );
        return (
            < >
            <p className="name_level_title mrg_left_0 p_back_level level_name_title">
                    <span className="span_back_level" onClick={()=>this.close_tab()}>{this.props.state.row_level.row.nom_niveau_g}</span>
                    /{Counterpart.translate('students_list')}
                    <span className="margin_top_5px"  
                          onClick={()=>this.close_tab()}>
                        <Close_button />
                    </span>
                </p>
                <hr />
        <div id="students_table"></div></>);
    }
}
export default Students_tab;
