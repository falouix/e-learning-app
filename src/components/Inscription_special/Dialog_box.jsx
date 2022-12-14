import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import Mail_verification from "./Mail_verification";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Url from "../../api/Apiurl";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Translate from "react-translate-component";
import { FiCheckCircle } from "react-icons/fi";
import { FcCancel,FcCheckmark } from "react-icons/fc";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AlertDialogSlide(test) {
    console.log(test.state.test);
    const key_conf=Math.floor(Math.random() * 100001);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if ((test.state.guest_name == "") || (test.state.guest_prenom == "") || (test.state.guest_cin == "")
            ||(test.state.guest_tel == "") || (test.state.guest_mail == "") || (test.state.guest_login == "")
        ){
        ReactDOM.render(
            <p className="alert_costum">fill all the reaquired</p>,
            document.getElementById("alert_costum")
        );
      }else{
        if(test.state.guest_cin.length!=8){
            ReactDOM.render(
                <p className="alert_costum">Wrong CIN number</p>,
                document.getElementById("alert_costum")
            );
        }else{
    setOpen(true);
        }}
  };
  const handlesave = () => {
    var posturl = Url.url + "pricing_special_session/addGuest.php";
    axios
      .post(posturl,
        {  
          key_conf:key_conf,
          level_id:test.state.level_id,
          guest_name: test.state.guest_name,
          guest_prenom: test.state.guest_prenom,
          guest_cin: test.state.guest_cin,
          guest_tel: test.state.guest_tel,
          guest_mail: test.state.guest_mail,
          guest_login: test.state.guest_login,
        }
      )
      .then(({ data }) => {
          console.log(data);
          if(data.msg=="Email already exist"){
            ReactDOM.render(
                <p className="alert_costum">Email already exist</p>,
                document.getElementById("alert_costum"));
          }else{
              if(data.msg=="Login already exist"){
                ReactDOM.render(
                    <p className="alert_costum">Login already exist</p>,
                    document.getElementById("alert_costum"));
            }else{
                if(data.msg=="Phone number already exist"){
                    ReactDOM.render(
                        <p className="alert_costum">Phone number already exist</p>,
                        document.getElementById("alert_costum"));
                }else{
          ReactDOM.render(
            <Mail_verification clef={key_conf} guest_id={data.id_guest} />,
            document.getElementById("Payment_special")
          );}}}
          setOpen(false);
      });
          console.log("save");
  };
  const handleClose = () => {
    console.log("colse");
  setOpen(false);
};

  return (
    <div className="border_radius_17">
        <Translate
           content="btn_save"
           component="button"
           class="btn btn-success btnrt margin_r_10"
           onClick={handleClickOpen}
                                        />
      <Dialog
       className="border_radius_17"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="anim_backgrnd" id="alert-dialog-slide-title">This is your informations did you agree :</DialogTitle>
        <DialogContent>
            <hr/>
          <DialogContentText id="alert-dialog-slide-description" className="textcntr_red">
            Nom: <span className="span_costum">{test.state.guest_name}</span>
          </DialogContentText>
          <hr/>
          <DialogContentText id="alert-dialog-slide-description" className="textcntr_red">
           Prenom :  <span className="span_costum">{test.state.guest_prenom}</span>
          </DialogContentText>
          <hr/>
          <DialogContentText id="alert-dialog-slide-description" className="textcntr_red">
            CIN: <span className="span_costum">{test.state.guest_cin}</span>
          </DialogContentText>
          <hr/>
          <DialogContentText id="alert-dialog-slide-description" className="textcntr_red">
            Tel: <span className="span_costum">{test.state.guest_tel}</span>
          </DialogContentText>
          <hr/>
          <DialogContentText id="alert-dialog-slide-description" className="textcntr_red">
           E-mail:  <span className="span_costum">{test.state.guest_mail}</span>
          </DialogContentText>
          <hr/>
          <DialogContentText id="alert-dialog-slide-description" className="textcntr_red">
            Login: <span className="span_costum">{test.state.guest_login}</span>
          </DialogContentText>
          <hr/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" className="btn-agree">
          <FcCancel/>
          </Button>
          <Button onClick={handlesave} color="primary" className="btn-agree">
           <FcCheckmark/>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
