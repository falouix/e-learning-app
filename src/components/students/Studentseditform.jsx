import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import Alert from "@material-ui/lab/Alert";
import Avatar from './avatar';
import Avatar1 from '@material-ui/core/Avatar';
import Studentform from './Studentsform';
import Studetstab from "./Studentstab";
import Close_button from './../../Close_button';
import Url from "../../api/Apiurl";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactDOM from "react-dom";
import Userform from "./Studentsform";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Camera } from "react-bootstrap-icons";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import { HiPencilAlt } from "react-icons/hi";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);

class Studentseditform extends Component { 

  state = {
    selectedFile: null,
    file: null,
  };
  //update function 
  updatestudent = (event) => {
    var posturl = Url.url + "Students/updateStudents.php";
    console.log(this.props.index.id_niveau_etudiant);
    axios.post(posturl, {
      student_id: this.props.index.id_etudiant,
      student_name: this.studentname.value,
      student_prenom: this.studentprenom.value,
      student_cin: this.studentcin.value,
      student_tel: this.studenttel.value,
      student_email: this.studentmail.value,
      student_login: this.studentlogin.value,
      student_level: this.studentlevel.value,
      student_level_etudiant: this.props.index.id_niveau_etudiant,
    }).then((res) => {
      console.log(res.data);
      console.log(this.props.state);
      if (res.data.msg == "etudiant updated") {
        ReactDOM.render(
          <Studetstab state={this.props.state} />,
          document.getElementById("tab")
        );
        ReactDOM.render(
          <Studentform state={this.props.sate} />,
          document.getElementById("editForm")
        );
      }

    });


  }
  fileSelect = (event) => {
    this.setState({ selectedFile: event.target.files[0] });

    this.setState({ file: URL.createObjectURL(event.target.files[0]) });
    ReactDOM.render(
      <React.Fragment>
        <Avatar1 src={URL.createObjectURL(event.target.files[0])} />
      </React.Fragment>,
      document.getElementById("avatarbig")
    );
  };
  fileUpload = () => {
    if (this.state.selectedFile == null) {
      ReactDOM.render(
        <React.Fragment>
            <Alert variant="filled" severity="error">
                {Counterpart.translate("choose_file")}
            </Alert>
        </React.Fragment>,
        document.getElementById("alert")
    );
    } else {
      ReactDOM.render(
        <progress id="progress_bar" className="progress_bar1" value="0" max="100" />,
        document.getElementById("progress")
    );
      const fd = new FormData();
      fd.append("image", this.state.selectedFile, this.props.index.id_etudiant);
      var posturl = Url.url + "Students/upload.php";
      axios
        .post(posturl,
          fd, {
            onUploadProgress: progressEvent => {
                console.log("loading...", Math.round((progressEvent.loaded / progressEvent.total) * 100), "%");
                document.getElementById("progress_bar").value = Math.round((progressEvent.loaded / progressEvent.total) * 100);

            }}
        )
        .then((res) => {
          ReactDOM.render(
            <Studetstab state={this.props.state} />,
            document.getElementById("tab")
          );
          ReactDOM.render(
            <Studentform state={this.props.state} />,
            document.getElementById("editForm")
          );
          console.log(res);
        });
    }
  };

  render() {
    console.log(this.props.index.id_etudiant);
    let id = {
      id: this.props.index.id_etudiant,
      alt: this.props.index.nom_etudiant,
      class: "large",
    }
    console.log(id);
    var posturl = Url.url + "Students/getLevels.php";
    axios
      .get(posturl)
      .then((res) => {
        console.log("all levels form", res.data.Levels);
        const level_list = res.data.Levels.map((item, index) => {
          console.log(item);
          if (item.id_niveau == this.props.index.id_niveau) {
            return (
              <option className="bckgr" value={item.id_niveau} key={index} selected >
                {item.nom_niveau_g}
              </option>
            );
          } else {
            return (
              <option value={item.id_niveau} key={index}>
                {item.nom_niveau_g}
              </option>
            );
          }
        });
        ReactDOM.render(
          <React.Fragment>
            <select
              class="custom-select"
              ref={(val) => (this.studentlevel = val)}
              id="levels_list"
              required
              onChange={() => { console.log(this.studentlevel.value) }}
            >
              {level_list}
            </select>
          </React.Fragment>,
          document.getElementById("levels_list")
        );
      });
    return (
      <React.Fragment>
        <div
          className="card text-white  studentform mb-3 shdw color-darblue "
          id="title"
        >
           <span onClick={() =>
                  ReactDOM.render(
                    <React.Fragment>
                      <Studentform state={this.props.state} />
                    </React.Fragment>,
                    document.getElementById("editForm")
                  )
                }>
<Close_button />
</span>
          <div className="card-header" id="title">
            <Translate className="edit_subject_title"  content="edit" component="h3" />
          </div>
          <div className="cntrdiv">
            <div id="avatarbig">
              <Avatar id={id} />
            </div>
            <div class="button-wrap">
              <label className="grab " for="upload">
                <Camera className="mrgn_top_120" color="royalblue" size={20} />
              </label>
              <input
                id="upload"
                type="file"
                className="input_avatar"
                onChange={this.fileSelect}
              />
            </div>
            <div id="progress">
            </div>
            <Translate
              content="save_img"
              component="Button"
              onClick={this.fileUpload}
              className="btn btn-success"
            />
          </div>

          <div id="alert"></div>
          <div class="card-body">
            <div>
              <form className="margin_t_3">
                <div class="form-group">
                  <input
                    ref={(val) => (this.studentname = val)}
                    type="text"
                    class="form-control"
                    id="studentname"
                    Value={this.props.index.nom_etudiant}
                  />

                  <hr />
                  <input
                    ref={(val) => (this.studentprenom = val)}
                    type="text"
                    class="form-control"
                    id="studentprenom"
                    Value={this.props.index.prenom_etudiant}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studentcin = val)}
                    type="text"
                    className="form-control"
                    id="studentcin"
                    Value={this.props.index.cin_etudiant}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studenttel = val)}
                    type="text"
                    className="form-control"
                    id="studenttel"
                    Value={this.props.index.tel_etudiant}
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studentmail = val)}
                    type="text"
                    class="form-control"
                    id="studentmail"
                    Value={this.props.index.mail_etudiant}
                    disabled
                  />
                  <hr />
                  <input
                    ref={(val) => (this.studentlogin = val)}
                    type="text"
                    class="form-control"
                    id="studentlogin"
                    Value={this.props.index.login_etudiant}
                    disabled
                  />
                  <hr />
                  <div id="levels_list"></div>
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
                onClick={this.updatestudent}
              />
              <hr />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}
export default Studentseditform;