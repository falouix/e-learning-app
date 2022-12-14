import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Translate from "react-translate-component";
import en from "./languages/en-US";
import ar from "./languages/ar-TN";
import Login from "./components/Login/Login";
import Edit_profile from "./components/edit_profile";
import Navbar from "./components/navbar/navbar";
import Counterpart from "counterpart";
import Box_modal from "./Box_modal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    color: "rgba(255,255,255,.75)",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function logoutlink() {
    ReactDOM.render(<Box_modal />, document.getElementById("root"));
  }
  const logout = () => {
    /* eslint-disable */
    sessionStorage.setItem("reloading_flag", 0);
    window.localStorage.setItem("logout", 1);
    const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    if (toLogout) {
      window.location.pathname = "/";
      window.location.reload();
      sessionStorage.clear();
      sessionStorage.removeItem("session");
      console.log(sessionStorage);
      ReactDOM.render(
        <React.StrictMode>
          <Router>
            <Route path="/" exact>
              <Login />
            </Route>
          </Router>
        </React.StrictMode>,
        document.getElementById("root")
      );
    } else {
      window.location.pathname = "app";
    }
  };
  const edit_profile = () => {
    ReactDOM.render(
      <React.StrictMode>
        <Edit_profile />
      </React.StrictMode>,
      document.getElementById("main")
    );
  };
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Translate
          content="profile"
          component="a"
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          {" "}
          <Translate
            content="action"
            component="a"
            className="dropdown-item"
            href="#"
            onClick={() => edit_profile(JSON.parse(sessionStorage.session))}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/" onClick={() => logout()}>
            {Counterpart.translate("Logout")}
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
