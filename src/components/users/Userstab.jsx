import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import "./assets/css/Users.css";
import Close_button from './../../Close_button';
import Alert from "@material-ui/lab/Alert";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ReactDOM from "react-dom";
import Userform from "./Usersform";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Camera } from "react-bootstrap-icons";
import { HiPencilAlt } from "react-icons/hi";
import { IconName } from "react-icons/fc";
import { BiTrash } from "react-icons/bi";
import Counterpart from "counterpart";
import Translate from "react-translate-component";
import en from "../../languages/en-US";
import ar from "../../languages/ar-TN";
import Url from "../../api/Apiurl";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);
Counterpart.setLocale("en");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const { SearchBar } = Search;

class Userstab extends Component {
  state = {
    selectedFile: null,
    file: null,
  };
  raw = {
    id: "",
    nom: "",
    prenom: "",
    cin: "",
    tel: "",
    mail: "",
    login: "",
    rool: "",
  };
  columns = [
    {
      dataField: "",
      text: <Translate type="text" content="avatar" />,
      sort: true,
      formatter: (cell, row) => (
        <Avatar alt={this.getAlt(row)} src={this.getAvatar(row)} />
      ),
    },
    {
      dataField: "nom_users",
      text: <Translate type="text" content="Name" />,
      sort: true,
    },
    {
      dataField: "prenom_users",
      text: <Translate type="text" content="prenom" />,
      sort: true,
    },
    {
      dataField: "tel_users",
      text: <Translate type="text" content="tel" />,
      sort: true,
    },
    {
      dataField: "rool_users",
      text: <Translate type="text" content="grade" />,
      sort: true,
      formatter: (cell, row) => (
        <Translate type="text" content={this.getrool(row.rool_users).value} />
      ),
    },
    {
      dataField: "mail_users",
      text: <Translate type="text" content="mail" />,
      sort: true,
    },
    {
      dataField: "",
      text: <Translate type="text" content="actions" />,
      sort: true,
      formatter: (cell, row) => (
        <>
        <button
          className="btn btn-outline-success btn-sm "
          onClick={() => this.edit(row)}
        >
          <HiPencilAlt />
        </button>
        <button
          className="btn btn-outline-danger margin-right-5 btn-sm "
          onClick={() => this.deleteUser(row)}
        >
          <BiTrash />
        </button>
        </>
      ),
    },
  ];
  //get rool
  getrool(row) {
    if (row == 2) {
      return {
        value: "rool2",
        rool: "2",
      };
    } else {
      return {
        value: "rool1",
        rool: "1",
      };
    }
  }
  //get avatar img
  getAvatar(row) {
    let srcimg = "https://uism-tn.com/api/img/users/";

    return srcimg + row.id_users + ".jpg";
  }
  //get alt img
  getAlt(row) {
    return row.nom_users;
  }

  //upload image

  fileSelect = (event) => {
    this.setState({ selectedFile: event.target.files[0] });

    this.setState({ file: URL.createObjectURL(event.target.files[0]) });
    ReactDOM.render(
      <React.Fragment>
        <Avatar src={URL.createObjectURL(event.target.files[0])} />
      </React.Fragment>,
      document.getElementById("avatarbig")
    );
  };
  fileUpload = () => {
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.raw.id);

    axios
      .post("https://uism-tn.com/api/Users/upload.php", fd)
      .then((res) => {
        ReactDOM.render(
          <React.Fragment>

            <Avatar src={
              "https://uism-tn.com/api/img/" +
              this.raw.id +
              ".jpg"
            } />
          </React.Fragment>,
          document.getElementById("avatarbig")
        );
        this.componentDidMount();
        console.log(res);
      });
  };
  //set vlues
  edit = (index) => {
    console.log("avatar src", this.getAvatar(index));
    this.raw.id = index.id_users;
    this.raw.nom = index.nom_users;
    this.raw.prenom = index.prenom_users;
    this.raw.cin = index.cin_users;
    this.raw.tel = index.tel_users;
    this.raw.mail = index.mail_users;
    this.raw.login = index.login_users;
    this.raw.rool = index.rool_users;
    var rool2 = 1;
    if (this.raw.rool == 1) {
      var rool2 = 2;
    }
    console.log("rool", this.getrool(this.raw.rool));
    console.log(this.raw);
    ReactDOM.render(
      <React.Fragment>
        <div
          className="card text-white  userform mb-3 shdw color-darblue"
          id="title"
        >
         <span onClick={() =>
                  ReactDOM.render(
                    <React.Fragment>
                      <Userform state={this.props.state} />
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
              <Avatar src={this.getAvatar(index)} />
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
            <Translate
              content="save_img"
              component="Button"
              onClick={this.fileUpload}
              className="btn btn-success"
            />
          </div>
          <div>
            <div id="alert"></div>
          </div>
          <div className="card-body">
            <div>
              <form onSubmit={this.updateUser}>
                <div className="form-group">
                  <input
                    onChange={(e) => {
                      this.raw.nom = e.target.value;
                    }}
                    Value={this.raw.nom}
                    type="text"
                    className="form-control"
                    id="nom"
                    placeholder="nom"
                  />
                  <hr />
                  <input
                    onChange={(e) => {
                      this.raw.prenom = e.target.value;
                    }}
                    Value={this.raw.prenom}
                    type="text"
                    className="form-control"
                    id="prenom"
                    placeholder="Prenom"
                  />
                  <hr />
                  <input
                    onChange={(e) => {
                      this.raw.cin = e.target.value;
                    }}
                    Value={this.raw.cin}
                    type="text"
                    className="form-control"
                    id="cin"
                    placeholder="CIN"
                  />
                  <hr />
                  <input
                    onChange={(e) => {
                      this.raw.tel = e.target.value;
                    }}
                    Value={this.raw.tel}
                    type="text"
                    className="form-control"
                    id="tel"
                    placeholder="Phone-number"
                  />
                  <hr />
                  <input
                    onChange={(e) => {
                      this.raw.mail = e.target.value;
                    }}
                    Value={this.raw.mail}
                    ref={(val) => (this.usermail = val)}
                    type="text"
                    className="form-control"
                    id="mail"
                    placeholder="Email"
                    disabled
                  />
                  <hr />
                  <input
                    onChange={(e) => {
                      this.raw.login = e.target.value;
                    }}
                    Value={this.raw.login}
                    ref={(val) => (this.userlogin = val)}
                    type="text"
                    className="form-control"
                    id="login"
                    placeholder="Login"
                    disabled
                  />
                  <hr />
                  <select
                    class="custom-select"
                    ref={(val) => (this.userrool = val)}
                    onChange={(e) => {
                      this.raw.rool = e.target.value;
                      console.log("from option change", this.raw.rool);
                    }}
                    id="levels_list"
                    required
                  >
                    <Translate
                      component="option"
                      value={this.raw.rool}
                      type="text"
                      content={this.getrool(this.raw.rool).value}
                    />
                    <Translate
                      component="option"
                      value={rool2}
                      type="text"
                      content={this.getrool(rool2).value}
                    />
                  </select>

                  <hr />
                  <button type="reset" class="btn btn-danger btnrt Subject_cancel_btn">
                    <Translate
                      content="btn_cancel"

                    />
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success btnrt margin_r_10 Subject_save_btn"
                  >
                    <Translate
                      content="btn_save"

                    />
                  </button>
                </div>
              </form>
            </div>
            <hr/>
          </div>
        </div>
      </React.Fragment>,
      document.getElementById("editForm")
    );
  };
  //update user
  updateUser = (event) => {
    event.preventDefault();
    var posturl = Url.url + "Users/updateUsers.php";
    console.log(posturl);
    axios
      .post(posturl, {
        user_id: this.raw.id,
        user_name: this.raw.nom,
        user_prenom: this.raw.prenom,
        user_cin: this.raw.cin,
        user_tel: this.raw.tel,
        user_email: this.raw.mail,
        user_login: this.raw.login,
        user_rool: this.raw.rool,
      })
      .then(
        function ({ data }) {
          console.log(data.msg);
          if (data.msg == "Please fill all the required fields!") {
            console.log("render here");
            ReactDOM.render(
              <Alert variant="filled" severity="error">
                {Counterpart.translate("Please_fill_all_the_required_fields")}
              </Alert>,
              document.getElementById("alert")
            );

          }
          if (data.msg == "User updated.") {
            console.log("update data", data);
            console.log("update rool", this.raw.rool);
            this.componentDidMount();
            ReactDOM.render(
              <React.Fragment>
                <Userform state={this.props.state} />
              </React.Fragment>,
              document.getElementById("editForm")
            );
          }

        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  };
  //get users
  componentDidMount() {
    console.log(Url.url + "Users/getUsers.php");
    //sen request
    axios.get(Url.url + "Users/getUsers.php").then((res) => {
      this.props.state.users = res.data.users;

      ReactDOM.render(
        <React.Fragment>
          <ToolkitProvider
            keyField="name"
            data={this.props.state.users}
            columns={this.columns}
            search
          >
            {(props) => (
              <div>
                <SearchBar {...props.searchProps} className="bckgr" />
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </React.Fragment>,
        document.getElementById("userstab")
      );
    });
  }

  //delte(desactivate) user
  deleteUser = (row) => {
  console.log(row);
  var posturl = Url.url + "Users/deleteUsers.php";
  axios
      .post(posturl, {
        user_id: row.id_users,
      })
      .then( (res) =>{
          console.log(res)
          this.componentDidMount();
        });
  }
  //RENDER

  render() {
    return (
      <>
        <div id="userstab"></div>
      </>
    );
  }
}

export default Userstab;
