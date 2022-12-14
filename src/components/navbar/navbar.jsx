import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "../users/Users";
import Teachers from "../teatchers/Teachers";
import Students from "../students/Students";
import Streaming from "../streaming/Streaming";
import Levels from "../levels/Levels";
import Levels_g from "../Levels_g/Levels_g"
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import "./navbar.css";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import { createBrowserHistory } from "history";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
const history = createBrowserHistory();
var cName1 = "nav-text";
var data_session_storage = JSON.parse(window.sessionStorage.getItem("session"));
var SidebarData = [
  {
    title: "Users",
    comp: "Users",
    cName: "nav-text m_users",
  },
  {
    title: "Teachers",
    comp: "Teachers",
    cName: "nav-text m_teachers",
  },
  {
    title: "Levels_g",
    comp: "Levels_g",
    cName: "nav-text m_levels_g",
  },
  {
    title: "Levels",
    comp: "Levels",
    cName: "nav-text m_levels",
  },
  {
    title: "Students",
    comp: "Students",
    cName: "nav-text m_students",
  }
];
var data_session_storage = JSON.parse(window.sessionStorage.getItem("session"));
class Navbar extends Component {
  componentDidMount(){
    ReactDOM.render(
      <div>
        <nav className="nav-menu">
          <ul className="nav-menu-item" id="menu_ul">
            {SidebarData.map((item, index) => {
                console.log("etudiant");
              return (
                <li key={index} className={item.cName} id={index}>
                  <Translate
                    content={item.title}
                    component="a"
                    onClick={() => {
                      let cName2 = "nav-text m_levels_g";
                      console.log(cName2);
                      this.GetPage(item.comp, item.cName);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </div >,
      document.getElementById("nav_bar_div")
    );
    console.log("component updated");
  }
  GetPage = (comp, get_class) => {
    let Main = <Users />;
    let component_name = <>vide</>;
    if (comp === "Users") {
      Main = <Users />;
      component_name = <>Users</>;
      SidebarData[0].cName = "nav-text m_users selected";
      SidebarData[1].cName = "nav-text m_teachers";
      SidebarData[2].cName = "nav-text m_students";
      SidebarData[3].cName = "nav-text m_levels";
      SidebarData[4].cName = "nav-text m_levels_g";
      ReactDOM.render(
        <React.Fragment>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} id={index}>
                <Translate
                  content={item.title}
                  component="a"
                  onClick={() => {
                    let cName2 = "nav-text m_levels_g";
                    this.GetPage(item.comp, item.cName);
                  }}
                />
              </li>
            );
          })}
        </React.Fragment>,
        document.getElementById("menu_ul")
      );
    }
    if (comp === "Teachers") {
      Main = <Teachers />;
      component_name = <>Teachers</>;
      SidebarData[0].cName = "nav-text m_users";
      SidebarData[1].cName = "nav-text m_teachers selected";
      SidebarData[2].cName = "nav-text m_students";
      SidebarData[3].cName = "nav-text m_levels";
      SidebarData[4].cName = "nav-text m_levels_g";
      ReactDOM.render(
        <React.Fragment>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} id={index}>
                <Translate
                  content={item.title}
                  component="a"
                  onClick={() => {
                    let cName2 = "nav-text m_levels_g";
                    console.log(cName2);
                    this.GetPage(item.comp, item.cName);
                  }}
                />
              </li>
            );
          })}
        </React.Fragment>,
        document.getElementById("menu_ul")
      );
    }
    if (comp === "Levels") {
      Main = <Levels />;
      component_name = <>Levels</>;
      SidebarData[0].cName = "nav-text m_users";
      SidebarData[1].cName = "nav-text m_teachers";
      SidebarData[2].cName = "nav-text m_students";
      SidebarData[3].cName = "nav-text m_levels selected";
      SidebarData[4].cName = "nav-text m_levels_g";
      ReactDOM.render(
        <React.Fragment>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} id={index}>
                <Translate
                  content={item.title}
                  component="a"
                  onClick={() => {
                    let cName2 = "nav-text m_levels_g";
                    console.log(cName2);
                    this.GetPage(item.comp, item.cName);
                  }}
                />
              </li>
            );
          })}
        </React.Fragment>,
        document.getElementById("menu_ul")
      );
    }
    if (comp === "Students") {
      Main = <Students />;
      component_name = <>Students</>;
      SidebarData[0].cName = "nav-text m_users";
      SidebarData[1].cName = "nav-text m_teachers";
      SidebarData[2].cName = "nav-text m_levels_g";
      SidebarData[3].cName = "nav-text m_levels";
      SidebarData[4].cName = "nav-text m_students selected";
      ReactDOM.render(
        <React.Fragment>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} id={index}>
                <Translate
                  content={item.title}
                  component="a"
                  onClick={() => {
                    let cName2 = "nav-text m_levels_g";
                    console.log(cName2);
                    this.GetPage(item.comp, item.cName);
                  }}
                />
              </li>
            );
          })}
        </React.Fragment>,
        document.getElementById("menu_ul")
      );
    }
    if (comp === "Levels_g") {
      let cName2 = "nav-text m_levels_g";
      console.log(cName1);
      Main = <Levels_g />;
      component_name = <>Levels_g</>;
      SidebarData[0].cName = "nav-text m_users";
      SidebarData[1].cName = "nav-text m_teachers";
      SidebarData[2].cName = "nav-text m_levels_g selected";
      SidebarData[3].cName = "nav-text m_levels";
      SidebarData[4].cName = "nav-text m_students";
      ReactDOM.render(
        <React.Fragment>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName} id={index}>
                <Translate
                  content={item.title}
                  component="a"
                  onClick={() => {
                    let cName2 = "nav-text m_levels_g";
                    console.log(cName2);
                    this.GetPage(item.comp, item.cName);
                  }}
                />
              </li>
            );
          })}
        </React.Fragment>,
        document.getElementById("menu_ul")
      );
    }
    console.log(get_class.indexOf("selected"));
    if (get_class.indexOf("selected") == -1) {
      ReactDOM.render(
        <React.Fragment>{Main}</React.Fragment>,
        document.getElementById("main")
      );
      ReactDOM.render(
        <React.Fragment>{Counterpart.translate(comp)}</React.Fragment>,
        document.getElementById("component_name")
      );
    }
  };
  render() {
    var data = JSON.parse(sessionStorage.getItem("session"));
    if (data != null) {
      var pathname1 = window.location.pathname;
      console.log("youshould do something", pathname1);
      if (window.location.pathname != "/app") {
        window.location.pathname = "app";
      }
    }else{
      
    }
    return (
      <div id="nav_bar_div">
      </div >
    );
  }
}
export default Navbar;
