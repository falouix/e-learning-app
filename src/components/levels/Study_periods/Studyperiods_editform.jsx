import React, { Component } from "react";
import Axios, { post } from "axios";
import Url from "../../../api/Apiurl";
import Alert from "@material-ui/lab/Alert";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import Studyperiods_tab from "./Studyperiods_tab";
import Studyperiods_form from "./Studyperiods_form";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

class Studyperiods_editform extends Component {
    placeholders = {
        subject: Counterpart.translate("subject"),
        teacher: Counterpart.translate("teacher"),
        nom: Counterpart.translate("Name"),
    };
    state = {
        id: "",
        Starting: this.props.index.dated_periode_etude,
        Ending: this.props.index.datef_periode_etude,
        Periods: [],
    };
    row = {};
    checkperiod() {
        var posturl = Url.url + "Levels/Study_periods/getStudy_periods.php";
        Axios
            .post(posturl, {
                level_id: this.props.id
            }
            )
            .then((res) => {
                this.state.Periods = res.data.Periods;
            });
        var bool = "true"
        console.log("this state", this.state.Periods);
        this.state.Periods.forEach(item => {
            console.log(item);
            if (this.props.index.id_periode_etude != item.id_periode_etude) {
                if ((this.state.Starting <= item.datef_periode_etude) && (this.state.Starting >= item.dated_periode_etude)) {
                    bool = "false";
                }
                if ((this.state.Ending <= item.datef_periode_etude) && (this.state.Ending >= item.dated_periode_etude)) {
                    bool = "false";
                }
            }
        });
        return (bool);
    }
    //update subject
    updateperiod = (event) => {
        console.log(this.checkperiod());
        console.log("id to send back", this.props.id);
        var posturl = Url.url + "Levels/Study_periods/updateStudy_periods.php";

        if (this.state.Starting < this.state.Ending) {
            if (this.checkperiod() == "true") {
                console.log("to update", this.state.Starting);

                Axios.post(posturl, {
                    Starting: this.state.Starting,
                    Ending: this.state.Ending,
                    id_period: this.props.index.id_periode_etude
                })
                    .then((res) => {
                        ReactDOM.render(
                            <Studyperiods_tab id={this.props.id} state={this.props.state} id={this.props.id} row={this.props.row} />,
                            document.getElementById("Studyperiods_tab")
                        );
                        ReactDOM.render(
                            <Alert variant="filled" severity="info">{Counterpart.translate("add_succ")}</Alert >,
                            document.getElementById("alert")
                        );
                        ReactDOM.render(
                            <Studyperiods_form id={this.props.id} state={this.props.state} id={this.props.id} row={this.props.row} />,
                            document.getElementById("Studyperiods_form")
                        );
                    });
            }
        }
        if (this.checkperiod() == "false") {
            ReactDOM.render(
                <Alert variant="filled" severity="error">{Counterpart.translate("period_fail3")}</Alert >,
                document.getElementById("alert")
            );

        }
        if (this.state.Starting >= this.state.Ending) {

            ReactDOM.render(
                <Alert variant="filled" severity="error">{Counterpart.translate("period_fail1")}</Alert >,
                document.getElementById("alert")
            );
        }

    }


    render() {

        return (
            <div
                className="card text-white  studentform mb-3 shdw color-darblue"
                id="title"
            >
                <div className="card-header" id="title">
                    <h3><Translate className="edit_subject_title"  content="edit_period" component="h3" /></h3>
                    <div class="flrrght">
                        <Translate
                            content="add_period"
                            component="Button"
                            className="btn btn-success"
                            onClick={() =>
                                ReactDOM.render(
                                    <Studyperiods_form id={this.props.id} state={this.props.state} id={this.props.id} row={this.props.row} />,
                                    document.getElementById("Studyperiods_form")
                                )
                            }
                        />
                    </div>
                </div>
                <div id="alert"></div>
                <div class="card-body">
                    <div>
                        <form >
                            <div class="form-group">
                                <label><Translate content="date_deb" component="h3" /></label>
                                <input

                                    type="date"
                                    class="form-control"
                                    ref={(val) => (this.Starting = val)}
                                    onChange={() => {
                                        this.state.Starting = this.Starting.value;
                                        console.log(this.state.Starting);

                                    }
                                    }
                                    Value={this.props.index.dated_periode_etude}
                                />
                                <hr />
                                <label><Translate content="date_fin" component="h3" /></label>
                                <input

                                    type="date"
                                    class="form-control"
                                    ref={(val) => (this.Ending = val)}
                                    onChange={() => {
                                        this.state.Ending = this.Ending.value;
                                        console.log(this.state.Ending);

                                    }
                                    }
                                    Value={this.props.index.datef_periode_etude}
                                />
                                <hr />
                                <Translate
                                    content="btn_cancel"
                                    component="button"
                                    type="reset"
                                    className="btn btn-danger btnrt Subject_cancel_btn"
                                />
                            </div>
                        </form>
                        <Translate
                            content="btn_save"
                            component="button"
                            class="btn btn-success btnrt margin_r_10 Subject_save_btn"
                            onClick={() => { this.updateperiod() }}
                        />
                    </div>
                </div>
            </div>);
    }
}

export default Studyperiods_editform;
