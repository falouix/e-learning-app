import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./App.css";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "./languages/en-US";
import ar from "./languages/ar-TN";
import { Button, Nav } from "react-bootstrap";
import Login from "./components/Login/Login";
import NestedList from "./NestedList";
import $ from "jquery";
import axios from "axios";
import jquery from "jquery";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("ar");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

class App extends Component {
  state = {
    language: "ar",
    nom: "",
    id: "",
    img: "",
  };
  onLangchange = (event) => {
    this.setState({ language: event.target.value });
    Counterpart.setLocale(event.target.value);
  };
  /*componentDidMount() {
    setTimeout(() => {
      if (JSON.parse(sessionStorage.session).type == "etudiant") {
        this.setState({
          nom: JSON.parse(sessionStorage.session).nom_etudiant,
          id: JSON.parse(sessionStorage.session).id_etudiant,
        });
      } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
        this.setState({
          nom: JSON.parse(sessionStorage.session).nom_enseignant,
          id: JSON.parse(sessionStorage.session).id_enseignant,
        });
      } else {
        this.setState({
          nom: JSON.parse(sessionStorage.session).nom_users,
          id: JSON.parse(sessionStorage.session).id_users,
        });
      }
      let url =
        "https://uism-tn.com/api/ImgProfileExist.php?id=" +
        this.state.id +
        "&type=" +
        JSON.parse(sessionStorage.session).type;
      // Details of the uploaded file
      // Request made to the backend api
      // Send formData object
      if (JSON.parse(sessionStorage.session).type == "etudiant") {
        if (this.state.img == "") {
          this.state.img = "img/students/" + this.state.id + ".jpg";
        }
      } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
        if (this.state.img == "") {
          this.state.img = "img/teachers/" + this.state.id + ".jpg";
        }
      } else {
        if (this.state.img == "") {
          this.state.img = "img/users/" + this.state.id + ".jpg";
        }
      }
      var url1 = [this.state.img];
      //var img  = '<div>aa</div>'
      axios.post(url, url1).then(
        (response) => {
          if (JSON.parse(sessionStorage.session).type == "etudiant") {
            if (response.data.status === true) {
              var profileImage1 = $("#avatarbig1").append(
                '<img id="image_profile1" class="image_profile1" src="" alt="image_profile1" height="100" />'
              );
              var img = $("#image_profile1").attr(
                "src",
                "https://uism-tn.com/api/" + this.state.img
              );
              if ($("#image_profile1", this).attr("src") != "") {
                $("#image_profile1").addClass("empty");
              } else {
                $("#image_profile1").addClass("not_empty");
              }
              if ($("#profileImage1").is(":empty")) {
                $("#profileImage1").hide();
              }
            } else {
              var firstName = $("#firstName").text();
              var intials = $("#firstName").text().charAt(0);
              var profileImage1 = $("#profileImage1").text(intials);
            }
          } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
            if (response.data.status === true) {
              var profileImage1 = $("#avatarbig1").append(
                '<img id="image_profile1" class="image_profile1" src="" alt="image_profile1" height="100" />'
              );
              var img = $("#image_profile1").attr(
                "src",
                "https://uism-tn.com/api/" + this.state.img
              );
              if ($("#image_profile1", this).attr("src") != "") {
                $("#image_profile1").addClass("empty");
              } else {
                $("#image_profile1").addClass("not_empty");
              }
              if ($("#profileImage1").is(":empty")) {
                $("#profileImage1").hide();
              }
            } else {
              var firstName = $("#firstName").text();
              var intials = $("#firstName").text().charAt(0);
              var profileImage1 = $("#profileImage1").text(intials);
            }
          } else {
            if (response.data.status === true) {
              var profileImage1 = $("#avatarbig1").append(
                '<img id="image_profile1" class="image_profile1" src="" alt="image_profile1" height="100" />'
              );
              var img = $("#image_profile1").attr(
                "src",
                "https://uism-tn.com/api/" + this.state.img
              );
              if ($("#image_profile1", this).attr("src") != "") {
                $("#image_profile1").addClass("empty");
              } else {
                $("#image_profile1").addClass("not_empty");
              }
              if ($("#profileImage1").is(":empty")) {
                $("#profileImage1").hide();
              }
            } else {
              var firstName = $("#firstName").text();
              var intials = $("#firstName").text().charAt(0);
              var profileImage1 = $("#profileImage1").text(intials);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }, 100);
  }*/
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.removeItem("session");
    console.log(sessionStorage);
    ReactDOM.render(
      <React.StrictMode>
        <Login />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
  data_session_storage = JSON.parse(window.sessionStorage.getItem("session"));
  render() {
    return (
      <Router>
        <Route path="/app" exact>
          <nav className=" toptop navbar-expand-lg navbar-light navbar navbar-dark grdntbckg">
            <a className="navbar-brand" href="#">
              <span id="firstName" className="hidden">
                {this.state.nom}
              </span>
              <div id="avatarbig1">
                <div id="profileImage1" className="profileImage1"></div>
              </div>
            </a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <NestedList />
                </li>
                <select
                  className="hidden"
                  value={this.state.language}
                  onChange={this.onLangchange}
                >
                  <option selected value="ar">
                    AR
                  </option>
                </select>
              </ul>
              <div>
                <h4 className="component_name" id="component_name">
                  Welcome <span>{this.data_session_storage.login_users}</span>
                </h4>
              </div>
            </div>
          </nav>
        </Route>
      </Router>
    );
  }
}

export default App;
