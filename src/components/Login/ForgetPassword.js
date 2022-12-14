import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Password from "./Password";
import $ from "jquery";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Counterpart from "counterpart";
class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
    };
  }
  back_login() {
    window.location.reload();
  }
  contactSubmit() {
    if (this.mail_users.value == "") {
      ReactDOM.render(
        <>{Counterpart.translate("Please_fill_all_the_required_fields")}</>,
        document.getElementById("login_alert")
      );
    } else {
      console.log(this.mail_users.value);
      axios
        .post("https://uism-tn.com/api/ForgetPassword.php", {
          mail_users: this.mail_users.value,
        })
        .then(function (response) {
          console.log(response);
          if (response.data.msg == "Email Address doesn't exist!") {
            ReactDOM.render(
              <>{Counterpart.translate("mail_not_exist")}</>,
              document.getElementById("login_alert")
            );
          }
          if (response.data.msg == "Invalid Email Address!") {
            ReactDOM.render(
              <>{Counterpart.translate("Invalid_Email_Address")}</>,
              document.getElementById("login_alert")
            );
          }
          if (
            response.data.msg == "an email has been sent check your mail box"
          ) {
            ReactDOM.render(
              <>
                <h1 className="forget_pass_h1">
                  {Counterpart.translate("mail_check")}
                </h1>
                <button
                  size="lg"
                  className="btn btn-outline-primary btn_forgt_pass"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  {Counterpart.translate("logging_in")}
                </button>
              </>,
              document.getElementById("recover_title")
            );
          }
        });
    }
  }
  render() {
    return (
      <div className="div_login container-fluid d-flex align-items-center justify-content-center">
        <div className="form_containe1 border_rad_0">
          <img class="width_22" src="https://uism-tn.com/api/login-logo.png" />
          <div id="recover_title">
            <hr className="h1-login margin_top-2-margin_bottom-6" />
            <h1 className="h1-login margin_top-0-margin_bottom--5 ">
              {Counterpart.translate("reccover_pass")}
            </h1>
            <hr className="h1-login margin_top-2-margin_bottom-6" />
            <p className="p_forget_pass">
              {Counterpart.translate("pass_reset_title_form")}
            </p>
            <div
              id="login_alert"
              className="margin_top-2-margin_bottom-6 border_rad_0"
            ></div>
            <input
              id="inputForUsername"
              name="login_users"
              type="login_users"
              className="form-control mail-input_forget_pass"
              ref={(val) => (this.mail_users = val)}
              placeholder={Counterpart.translate("mail")}
            />
            <hr className="margin_top-2-margin_bottom-5" />
            <button
              size="lg"
              className="btn btn-outline-primary btn-login btn_forget_pass"
              onClick={() => {
                this.contactSubmit();
              }}
            >
              {Counterpart.translate("confirm")}
            </button>
            <button
              size="lg"
              className="btn btn-outline-primary btn_forgt_pass padding_0_17"
              onClick={() => {
                window.location.reload();
              }}
            >
              {Counterpart.translate("back")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgetPassword;
