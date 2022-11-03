import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as Iconsname from "react-icons/fi";
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
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
var cName1 = "nav-text";
var data_session_storage = JSON.parse(window.sessionStorage.getItem("session"));
var SidebarData = [
  {
    title: "Levels",
    comp: "Levels",
    cName: "nav-text m_levels",
  },
];
var data_session_storage = JSON.parse(window.sessionStorage.getItem("session"));
class Navbar_s extends Component {
  GetPage = (comp, get_class) => {
    let Main = <Users />;
    let component_name = <>vide</>;
   
    if (comp === "Levels") {
      Main = <Levels />;
      component_name = <>Levels</>;
      SidebarData[0].cName = "nav-text m_levels selected";
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
    }
  };
  render() {
    console.log("student logged in")
    return (
      <div id="nav_bar_div">
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
      </div >
      </div >
    );
  }
}
export default Navbar_s;
