import React, { Component } from "react";
import axios, { post } from "axios";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import ReactDOM from "react-dom";
import Userstab from "../../users/Userstab";
//import GetMatEns from "./GetMatEns";
import Button from "react-bootstrap/Button";
import Alert from "@material-ui/lab/Alert";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import Counterpart from "counterpart";
import Seance from "./Classes_details";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class AddSeance extends Component {



  constructor() {
    super();
    this.state = {
      matieres: [],
      date_deb: "",
      date_fin: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let initialMatieres = [];
    fetch('https://uism-tn.com/api/get_mat_ens.php?id=' + this.props.state.row_level.row.id_niveau)
      .then(response => {
        return response.json();

      }).then(data => {
        console.log(data);
        initialMatieres = data.matiere.map((matiere) => {
          return matiere
        });
        this.setState({
          matieres: initialMatieres,
        });
      });
  }
  /*
  placeholders = {
      title: Counterpart.translate("title"),
      date_deb: Counterpart.translate("date_deb"),
      date_fin: Counterpart.translate("date_fin"),
      matiere: Counterpart.translate("subject"),
      prof: Counterpart.translate("proffesor"),
     
    };
  */
  handleChange = name => event => {
    const target = event.target;
    const name = target.name;

    this.setState({
      date_deb: event.target.value
    });
    //  console.log("date deb", this.state.date_deb);
    // console.log("date fin", this.state.date_fin);
  };
  handleChangefin = name => event => {
    const target = event.target;
    const name = target.name;

    this.setState({

      date_fin: event.target.value
    });

    //console.log("date fin", this.state.date_fin);
  };

  insertSeance = (event) => {
    event.preventDefault();
    console.log(this.seancetitle.value);
    console.log(this.state.date_deb);
    console.log(this.state.date_fin);
    console.log(this.seancematiere.value);
    axios
      .post("https://uism-tn.com/api/addseance.php", {
        title: this.seancetitle.value,
        date_deb: this.state.date_deb,
        date_fin: this.state.date_fin,
        matiere: this.seancematiere.value,
        id_niveau: 2,
      })
      .then(
        function ({ data }) {
          console.log(data);

          if (data.msg == "Seance Inserted") {
            console.log("true");
            ReactDOM.render(
              <React.Fragment>
                <Seance />
              </React.Fragment>,
              document.getElementsByClassName('fc')[0]

            );

          }
          if (data.msg == "Seance Inserted") {
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="success" severity="info" >
                  {data.msg}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          } else {
            ReactDOM.render(
              <React.Fragment>
                <Alert variant="standard" severity="error">
                  {data.msg}
                </Alert>
              </React.Fragment>,
              document.getElementById("alert")
            );
          }
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  //id_handler

  //RENDER

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div
          className="card text-white  userform mb-3 shdw color-darblue "
          id="title"
        >
          <div className="card-header" id="title">
            <Translate content="new_seance" component="h3" />
          </div>

          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3" onSubmit={this.insertSeance}>
                <div class="form-group">
                  <input
                    ref={(val) => (this.seancetitle = val)}
                    type="text"
                    class="form-control"
                    placeholder={Counterpart.translate("title_seance")}
                  />
                  <hr />
                  <TextField
                    id="datetime-local"
                    label={Counterpart.translate("date_deb")}
                    type="datetime-local"
                    onChange={this.handleChange("date_deb")}
                    value={this.state.date_deb}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <hr />
                  <TextField
                    id="datetime-local"
                    label={Counterpart.translate("date_fin")}
                    type="datetime-local"
                    onChange={this.handleChangefin("date_fin")}
                    value={this.state.date_fin}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <hr />


                  <select class="form-control" id="mat_ens" ref={(val) => (this.seancematiere = val)}>
                    {this.state.matieres.map((mat) => <option key={mat.id_matiere} value={mat.id_matiere}>{mat.nom_matiere}</option>)}
                  </select>
                  <Translate
                    content="btn_cancel"
                    component="button"
                    type="reset"
                    className="btn btn-danger btnrt"
                  />

                  <Translate
                    content="btn_save"
                    type="submit"
                    component="button"
                    class="btn btn-success btnrt margin_r_10"
                  />
                </div>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


export default AddSeance;
