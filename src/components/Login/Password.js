import React from 'react'
import ReactDOM from "react-dom";
import axios from "axios";
import Login from "./Login";
import $ from "jquery";
 class Password extends React.Component {
    constructor(props){
        super(props);
   
        this.state = {
            fields: {},
            errors: {},
        }
     }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
   
        if(!fields["pass_etudiant"]){
           formIsValid = false;
           errors["pass_etudiant"] = "Cannot be empty";
        }

       this.setState({errors: errors});
       return formIsValid;
   }
    
   
   contactSubmit(e){
    
        e.preventDefault();
        if(this.handleValidation()){
            let errors1 = {};
            let formIsValid = true;
            const password = this.state.fields.pass_etudiant
            axios.post('https://uism-tn.com/api/ForgetPassword.php', {
                Password: this.state.fields.pass_etudiant,
                mail_password: this.props.mail
              })
              .then(function (response) {
                    $('#Error_msg').show()
                    setTimeout(() => {
                       $('#Error_msg').hide()  
                    }, 1000);
                    ReactDOM.render(
                        <React.StrictMode>
                          <Login />
                        </React.StrictMode>,
                        document.getElementById("root")
                      );
              })
              .catch(function (error) {
                console.log(error);
              });
        }else{
           alert("Form has errors.")
        }
  
    }

    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
        
    }
    render(){
        return (
            <div  className={`div_login div_inscrit align-items-center justify-content-center`}>  
                    <fieldset className="border-form p-3 rounded">
                        <legend className={`rounded p-1 text-center login_form`}>
                            Forget Password
                        </legend>
                        <form name="contactform" className="contactform" noValidate autoComplete="off" onSubmit= {this.contactSubmit.bind(this)}>
                        <div className="header">Pour pour récupérer votre mot de passe remplissez les champs obligatoires.<br></br>
                        <span id="Error_msg" className="header hidden" style={{color: "green"}}>Votre mot de passe est changer avec success</span>
                        </div>
                        
                            <div className="col-md-6 inpu_forms">
                            <div className="form-group">
                            <label htmlFor="inputForPassword">Votre nouveau password</label>
                            <span className="mandatory">*</span>
                            <input className="form-control" ref="pass_etudiant" type="password" size="30" placeholder="Password" onChange={this.handleChange.bind(this, "pass_etudiant")} value={this.state.fields["pass_etudiant"]}/>
                            <span style={{color: "red"}}>{this.state.errors["pass_etudiant"]}</span>
                        </div>  
                            </div>
                            
                        <div className="d-flex align-items-center">
                            <button
                                type="submit"
                                size="lg"
                                className="btn btn-outline-primary"
                            >
                                Envoyer
                            </button>
                        </div>
                        </form>
                    </fieldset>         
                </div>
        )
    }
  
}
export default Password;