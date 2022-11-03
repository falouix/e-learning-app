import React, { Component } from "react";
import axios, { post } from "axios";
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Lvelsform from './Levelsform'
import Levelstab from "./Levelstab";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import Close_button from './../../Close_button';
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class Levelseditform extends Component {
  updatelevel = (event) => {
    event.preventDefault();
    var posturl = Url.url + "Levels/updateLevels.php";
    axios
      .post(posturl,
        {
          level_order: this.levelorder.value,
          level_semester: this.levelsemester.value,
          level_year: this.levelyear.value,
          level_active: this.levelactive.value,
          level_id: this.props.row.id_niveau,
        }
      )
      .then(({ data }) => {
        //rerendring levelsform
        //rerendring levelstab
        ReactDOM.render(
          <React.Fragment>
            <Levelstab state={this.props.state} />
          </React.Fragment>,
          document.getElementById("tab")
        );
        ReactDOM.render(
          <React.Fragment>
            <Lvelsform state={this.props.state} />
          </React.Fragment>,
          document.getElementById("editForm")
        );
      });
  }
  componentDidMount() {
    if (this.props.row.active_niveau == 1) {
      ReactDOM.render(
        <select ref={(val) => (this.levelactive = val)}
          type="text" class="form-control">
          <option value='1' className="bckgr" selected>{Counterpart.translate("active")}</option>
          <option value='0'>{Counterpart.translate("not_active")}</option>
        </select>,
        document.getElementById("active")
      );
    } else {
      ReactDOM.render(
        <select ref={(val) => (this.levelactive = val)}
          type="text" class="form-control">
          <option value='1' >{Counterpart.translate("active")}</option>
          <option value='0' className="bckgr" selected>{Counterpart.translate("not_active")}</option>
        </select>,
        document.getElementById("active")
      );
    }
    if (this.props.row.semestre_niveau == 1) {
      ReactDOM.render(
        <select
          ref={(val) => (this.levelsemester = val)}
          type="text"
          class="form-control"
        >
          <option value='1' className="bckgr" slected>1</option>
          <option value='2'>2</option>
        </select>,
        document.getElementById("semester")
      );
    } else {
      ReactDOM.render(
        <select
          ref={(val) => (this.levelsemester = val)}
          type="text"
          class="form-control"
        >
          <option value='1'>1</option>
          <option value='2' className="bckgr" selected>2</option>
        </select>,
        document.getElementById("semester")
      );
    }
  }
  state = {
    orders: "",
  };
  orders = <option></option>;
  render() {
    //get levels names 
    var posturl = Url.url + "Levels_g/getLevels_g.php";
    axios
      .get(posturl)
      .then((res) => {
        this.orders = res.data.Levels_g.map(
          (item, index) => {
            if (this.props.row.id_niveau_g == item.id_niveau_g) {
              return (
                <option className="bckgr" value={item.id_niveau_g} key={index} selected>
                  {item.nom_niveau_g}
                </option>)

            } else {
              return (
                <option value={item.id_niveau_g} key={index}>
                  {item.nom_niveau_g}
                </option>
              )
            }
          }
        )
        this.setState({ orders: this.orders });
      });
    //get years values
    let y = 2000;
    let years = [];
    for (var i = 0; i < 50; i++) {
      let x = y + "/" + (y + 1)
      years.push(x);
      y++;
    }
    let years_options = years.map((index) => {
      if (index == this.props.row.annee_niveau) {
        return (<option value={index} className="bckgr" selected>
          {index}
        </option>)

      } else {
        return (<option value={index}>
          {index}
        </option>)
      }
    });
    return (
      <React.Fragment>
        <div
          className="card text-white  studentform mb-3 shdw color-darblue "
          id="title"
        >
          <span className="margin_top_5px"  
                  onClick={() =>
                    ReactDOM.render(
                      <React.Fragment>
                        <Lvelsform state={this.props.state} />
                      </React.Fragment>,
                      document.getElementById("editForm")
                    )
                  }>
                  <Close_button />
          </span>
          <div className="card-header" id="title">
            <div >
              <Translate content="edit" component="h3" className="edit_subject_title" />
            </div>
          </div>
          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" >
                <div class="form-group">
                  <label style={{ float: "right" }}>{Counterpart.translate("scholar_year")}</label>
                  <select
                    ref={(val) => (this.levelyear = val)}
                    type="text"
                    class="form-control"
                  >
                    {years_options}
                  </select>
                  <hr />
                  <label style={{ float: "right" }}>{Counterpart.translate("semester")}</label>
                  <div id="semester"></div>
                  <hr />
                  <label style={{ float: "right" }}>{Counterpart.translate("active")}/{Counterpart.translate("not_active")}</label>
                  <div id="active"></div>
                  <hr />
                  <label style={{ float: "right" }}>{Counterpart.translate("order")}</label>
                  <div id="orders">
                    <select class="form-control"
                      ref={(val) => (this.levelorder = val)}
                    >{this.state.orders}
                    </select>
                  </div>

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
                onClick={this.updatelevel}
                component="button"
                class="btn btn-success btnrt margin_r_10 Subject_save_btn"
              />
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

}
export default Levelseditform;