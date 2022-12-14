import React, { useState, useEffect } from "react";
import Translate from "react-translate-component";
import en from "../languages/en-US";
import ar from "../languages/ar-TN";
import Userform from "./students/Studentsform";
import ReactDOM from "react-dom";
import Counterpart from "counterpart";
import { Camera } from "react-bootstrap-icons";
import axios from "axios";
import Navbar from "./navbar/navbar";
import $ from "jquery";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
class Edit_profile extends React.Component {
  constructor(props) {
    super(props);
    if (JSON.parse(sessionStorage.session).type == "etudiant") {
      this.state = {
        balise_img: {},
        img: JSON.parse(sessionStorage.session).avatar,
        selectedFile: null,
        id: JSON.parse(sessionStorage.session).id_etudiant,
        nom: JSON.parse(sessionStorage.session).nom_etudiant,
        prenom: JSON.parse(sessionStorage.session).prenom_etudiant,
        cin: JSON.parse(sessionStorage.session).cin_etudiant,
        tel: JSON.parse(sessionStorage.session).tel_etudiant,
        mail: JSON.parse(sessionStorage.session).mail_etudiant,
        password: JSON.parse(sessionStorage.session).pass_etudiant,
        confpassword: "",
        login: JSON.parse(sessionStorage.session).login_etudiant,
        errors: {},
      };
    } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
      this.state = {
        balise_img: {},
        img: JSON.parse(sessionStorage.session).avatar,
        selectedFile: null,
        id: JSON.parse(sessionStorage.session).id_enseignant,
        nom: JSON.parse(sessionStorage.session).nom_enseignant,
        prenom: JSON.parse(sessionStorage.session).prenom_enseignant,
        cin: JSON.parse(sessionStorage.session).tel_enseignant,
        tel: JSON.parse(sessionStorage.session).cin_enseignant,
        mail: JSON.parse(sessionStorage.session).mail_enseignant,
        password: JSON.parse(sessionStorage.session).pass_enseignant,
        confpassword: "",
        login: JSON.parse(sessionStorage.session).login_enseignant,
        errors: {},
      };
    } else if (JSON.parse(sessionStorage.session).type == "guest") {
      this.state = {
        balise_img: {},
        img: JSON.parse(sessionStorage.session).avatar,
        selectedFile: null,
        id: JSON.parse(sessionStorage.session).id_guest,
        nom: JSON.parse(sessionStorage.session).nom_etudiant,
        prenom: JSON.parse(sessionStorage.session).prenom_etudiant,
        cin: JSON.parse(sessionStorage.session).tel_etudiant,
        tel: JSON.parse(sessionStorage.session).cin_etudiant,
        mail: JSON.parse(sessionStorage.session).mail_etudiant,
        password: JSON.parse(sessionStorage.session).pass_etudiant,
        confpassword: "",
        login: JSON.parse(sessionStorage.session).login_etudiant,
        errors: {},
      };
    } else {
      this.state = {
        balise_img: {},
        img: JSON.parse(sessionStorage.session).avatar,
        selectedFile: null,
        id: JSON.parse(sessionStorage.session).id_users,
        nom: JSON.parse(sessionStorage.session).nom_users,
        prenom: JSON.parse(sessionStorage.session).prenom_users,
        cin: JSON.parse(sessionStorage.session).cin_users,
        tel: JSON.parse(sessionStorage.session).tel_users,
        mail: JSON.parse(sessionStorage.session).mail_users,
        password: JSON.parse(sessionStorage.session).pass_users,
        confpassword: "",
        login: JSON.parse(sessionStorage.session).login_users,
        errors: {},
      };
    }

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    let errors = {};
    // Create an object of formData
    const formData = new FormData();
    if (this.state.selectedFile == null) {
      errors["Img_error"] = "يجب عليك تحميل الصور";
      this.setState({ errors: errors });
    } else {
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      if (JSON.parse(sessionStorage.session).type == "etudiant") {
        var id = JSON.parse(sessionStorage.session).id_etudiant;
      } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
        var id = JSON.parse(sessionStorage.session).id_enseignant;
      } else {
        var id = JSON.parse(sessionStorage.session).id_users;
      }
      // Request made to the backend api
      // Send formData object
      let url =
        "https://uism-tn.com/api/ProfileImgUpload.php?id=" +
        id +
        "&type=" +
        JSON.parse(sessionStorage.session).type;
      // Details of the uploaded file
      console.log(this.state.selectedFile.name);

      // Request made to the backend api
      // Send formData object
      axios.post(url, formData).then(
        (response) => {
          if (JSON.parse(sessionStorage.session).type == "etudiant") {
            ReactDOM.render(
              <React.Fragment>
                <img
                  className="imgAvatar"
                  src={
                    "https://uism-tn.com/api/img/etudiant/" +
                    this.state.id +
                    ".jpg"
                  }
                />
              </React.Fragment>,
              document.getElementById("avatarbig")
            );
          } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
            ReactDOM.render(
              <React.Fragment>
                <img
                  className="imgAvatar"
                  src={
                    "https://uism-tn.com/api/img/enseignant/" +
                    this.state.id +
                    ".jpg"
                  }
                />
              </React.Fragment>,
              document.getElementById("avatarbig")
            );
          } else {
            ReactDOM.render(
              <React.Fragment>
                <img
                  className="imgAvatar"
                  src={
                    "https://uism-tn.com/api/img/users/" +
                    this.state.id +
                    ".jpg"
                  }
                />
              </React.Fragment>,
              document.getElementById("avatarbig")
            );
            console.log(response);
          }
          this.setState({ img: response.data[0] });
          console.log(this.state.img);
          document.getElementById("img_succ").style.display = "flex";
          $("#error_img").hide();
          setTimeout(function () {
            $("#img_succ").hide("slow");
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    // Update the formData object
  };

  handleSubmit(event) {
    let errors = {};
    if (this.state.confpassword != this.state.password) {
      errors["confpassword"] = "كلمتا المرور مختلفتان";
      this.setState({ errors: errors });
    } else {
      errors["confpassword"] = "";
      this.setState({ errors: errors });
    }
    if (errors.confpassword == "") {
      document.getElementById("msg_succ").style.display = "flex";

      axios
        .post("https://uism-tn.com/api/updateProfile.php", {
          type: JSON.parse(sessionStorage.session).type,
          id: this.state.id,
          nom: this.state.nom,
          prenom: this.state.prenom,
          cin: this.state.cin,
          tel: this.state.tel,
          mail: this.state.mail,
          password: this.state.password,
          confpassword: this.state.confpassword,
          login: this.state.login,
        })
        .then(
          (response) => {
            ReactDOM.render(
              <React.StrictMode>
                <Navbar />
              </React.StrictMode>,
              document.getElementById("sid_bar")
            );
            ReactDOM.render(
              <React.StrictMode>
                <Edit_profile />
              </React.StrictMode>,
              document.getElementById("main")
            );
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      alert("Form has errors.");
      event.preventDefault();
    }

    //document.getElementById('msg_succ').style.display = 'none';
  }

  render() {
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
        this.state.img = "img/etudiant/" + this.state.id + ".jpg";
      }
    } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
      if (this.state.img == "") {
        this.state.img = "img/enseignant/" + this.state.id + ".jpg";
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
            var profileImage = $("#avatarbig").append(
              '<img id="image_profile" class="image_profile" src="" alt="image_profile" height="100" />'
            );
            var img = $("#image_profile").attr(
              "src",
              "https://uism-tn.com/api/" + this.state.img
            );
            if ($("#image_profile", this).attr("src") != "") {
              $("#image_profile").addClass("empty");
            } else {
              $("#image_profile").addClass("not_empty");
            }
            if ($("#profileImage").is(":empty")) {
              $("#profileImage").hide();
            }
          } else {
            var firstName = $("#firstName").text();
            var intials = $("#firstName").text().charAt(0);
            var profileImage = $("#profileImage").text(intials);
          }
        } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
          if (response.data.status === true) {
            var profileImage = $("#avatarbig").append(
              '<img id="image_profile" class="image_profile" src="" alt="image_profile" height="100" />'
            );
            var img = $("#image_profile").attr(
              "src",
              "https://uism-tn.com/api/" + this.state.img
            );
            if ($("#image_profile", this).attr("src") != "") {
              $("#image_profile").addClass("empty");
            } else {
              $("#image_profile").addClass("not_empty");
            }
            if ($("#profileImage").is(":empty")) {
              $("#profileImage").hide();
            }
          } else {
            var firstName = $("#firstName").text();
            var intials = $("#firstName").text().charAt(0);
            var profileImage = $("#profileImage").text(intials);
          }
        } else {
          if (response.data.status === true) {
            var profileImage = $("#avatarbig").append(
              '<img id="image_profile" class="image_profile" src="" alt="image_profile" height="100" />'
            );
            var img = $("#image_profile").attr(
              "src",
              "https://uism-tn.com/api/" + this.state.img
            );
            if ($("#image_profile", this).attr("src") != "") {
              $("#image_profile").addClass("empty");
            } else {
              $("#image_profile").addClass("not_empty");
            }
            if ($("#profileImage").is(":empty")) {
              $("#profileImage").hide();
            }
          } else {
            var firstName = $("#firstName").text();
            var intials = $("#firstName").text().charAt(0);
            var profileImage = $("#profileImage").text(intials);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return (
      <div
        className="div_edit_profile card text-white  userform mb-3 shdw color-darblue"
        id="title"
      >
        <div
          id="msg_succ"
          className="alert fade show alert-success hidden"
          role="alert"
        >
          ...تم التعديل بنجاح
          <span aria-hidden="true" className="ml-auto cursor-pointer">
            ×
          </span>
        </div>
        <div className="card-header" id="title">
          <Translate content="edit" component="h3" />
        </div>
        <div className="cntrdiv">
          <div className="button-wrap">
            <div
              id="img_succ"
              className="alert fade show alert-success hidden"
              role="alert"
            >
              ...تم حفظ الصورة بنجاح
              <span aria-hidden="true" className="ml-auto cursor-pointer">
                ×
              </span>
            </div>
            <label className="grab " htmlFor="upload">
              <Camera className="mrgn_top_120" color="royalblue" size={20} />
              <div id="avatarbig">
                <div id="profileImage" className="profileImage"></div>
              </div>
            </label>
            <input
              type="file"
              onChange={this.onFileChange}
              id="upload"
              className="input_avatar"
              name="file"
            />
          </div>
          <Translate
            content="save_img"
            component="Button"
            className="btn btn-success"
            id="save_img"
            onClick={this.onFileUpload}
          />
          <span id="error_img" style={{ color: "red" }}>
            {this.state.errors["Img_error"]}
          </span>
        </div>
        <div>
          <hr />
        </div>
        <div className="card-body">
          <div>
            <form
              name="editForm"
              className="contactform"
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <input
                  type="hidden"
                  //value={this.id}
                  name="id"
                />
                <span id="firstName" className="hidden">
                  {this.state.nom}
                </span>
                <input
                  type="text"
                  className="form-control"
                  name="nom"
                  placeholder="اللقب"
                  value={this.state.nom}
                  onChange={this.handleChange}
                />
                <hr />
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  name="prenom"
                  placeholder="الاسم"
                  value={this.state.prenom}
                  onChange={this.handleChange}
                />
                <hr />
                <input
                  type="text"
                  className="form-control"
                  id="cin"
                  name="cin"
                  placeholder="بطاقة الهوية الوطنية"
                  value={this.state.cin}
                  onChange={this.handleChange}
                />
                <hr />
                <input
                  type="text"
                  className="form-control"
                  id="tel"
                  name="tel"
                  placeholder="الهاتف"
                  value={this.state.tel}
                  onChange={this.handleChange}
                />
                <hr />
                <input
                  type="text"
                  className="form-control"
                  id="mail"
                  name="mail"
                  placeholder="البريد الإلكتروني"
                  value={this.state.mail}
                  onChange={this.handleChange}
                />
                <hr />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="كلمه السر"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["confpassword"]}
                </span>
                <hr />
                <input
                  type="password"
                  className="form-control"
                  id="configpassword"
                  name="confpassword"
                  placeholder="تأكيد كلمة المرور"
                  value={this.state.confpassword}
                  onChange={this.handleChange}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["confpassword"]}
                </span>
                <hr />
                <input
                  type="text"
                  className="form-control"
                  id="login"
                  name="login"
                  placeholder="تسجيل الدخول"
                  value={this.state.login}
                  onChange={this.handleChange}
                />
                <div className="form-group">
                  <Translate
                    component="Butoon"
                    content="btn_cancel"
                    type="reset"
                    className="btn btn-danger btnrt "
                  >
                    cancel
                  </Translate>
                  <Translate
                    component="Button"
                    content="btn_save"
                    type="submit"
                    className="btn btn-success btnrt margin_r_10"
                  >
                    Update
                  </Translate>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit_profile;
