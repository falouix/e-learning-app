import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Close_button from './../../Close_button';
import Levelsgtab from "./Levelsgtab";
import Levelsgform from "./Levelsgform";
import Alert from "@material-ui/lab/Alert";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");

class Levelsgeditform extends Component {
    row = {
        order_niveau_g: this.props.row.order_niveau_g,
        nom_niveau_g: this.props.row.nom_niveau_g,
    }
    updateLevel = (event) => {
        console.log(this.props.row.id_niveau_g);
        console.log(this.row.nom_niveau_g);
        console.log(this.row.order_niveau_g);

        var posturl = Url.url + "Levels_g/updateLevelg.php";
        axios
            .post(posturl,
                {
                    levelg_id: this.props.row.id_niveau_g,
                    levelg_name: this.row.nom_niveau_g,
                    levelg_order: this.row.order_niveau_g
                }
            )
            .then(
                function ({ data }) {
                    console.log(data);

                    ReactDOM.render(
                        <React.Fragment>
                            <Levelsgform state={this.props.state} />
                        </React.Fragment>,
                        document.getElementById("editForm")
                    );
                    ReactDOM.render(
                        <Levelsgtab state={this.props.state} />,
                        document.getElementById("tab")
                    );
                }.bind(this)
            )
            .catch(function (error) {
                console.log(error);
            });
    };
    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <div
                    className="card text-white  studentform mb-3 shdw color-darblue "
                    id="title"
                >
                    <span className="margin_top_5px"  onClick={() =>
                                    ReactDOM.render(
                                        <React.Fragment>
                                            <Levelsgform state={this.props.state} />
                                        </React.Fragment>,
                                        document.getElementById("editForm")
                                    )
                                }>
                        <Close_button />
                    </span>
                    <div className="card-header" id="title">
                        <Translate className="edit_subject_title" content="update_level" component="h3" />
                    </div>
                    <div id="alert"></div>
                    <div class="card-body">
                        <div>
                            <form className="margin_t_3">
                                <div class="form-group">
                                    <input
                                        ref={(val) => (this.levelgname = val)}
                                        type="text"
                                        class="form-control"
                                        Value={this.props.row.nom_niveau_g}
                                        onChange={() => {
                                            console.log(this.levelgname.value)
                                            this.row.nom_niveau_g = this.levelgname.value
                                        }}
                                    />
                                    <hr />
                                    <input
                                        ref={(val) => (this.levelgorder = val)}
                                        type="number"
                                        class="form-control"
                                        Value={this.props.row.order_niveau_g}
                                        onChange={() => {
                                            console.log(this.levelgorder.value)
                                            this.row.order_niveau_g = this.levelgorder.value
                                        }}
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
                                onClick={this.updateLevel}
                            />
                            <hr />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
export default Levelsgeditform; 