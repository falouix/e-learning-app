import React, { useState, sessionStorage } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Login from "./Login";
import { isEmptyObject } from "jquery";

class Payments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            fields: {},
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;


        if (!fields["num_mondat"]) {
            formIsValid = false;
            errors["num_mondat"] = "Cannot be empty";
        }
        if (typeof fields["num_mondat"] !== "undefined") {

            if (!fields["num_mondat"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["num_mondat"] = "Only numbers";
            } else if (fields["num_mondat"].length < 1) {
                formIsValid = false;
                errors["num_mondat"] = "only numbers"
            }
        }
        if (!fields["type"] || fields["type"] == 0) {
            formIsValid = false;
            errors["type"] = "Cannot be empty";
        }


        //file

        if (this.state.selectedFile == null) {
            formIsValid = false;
            errors["files"] = "Cannot be empty";
        }


        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit(e) {

        e.preventDefault();
        if (this.handleValidation()) {
            const data = new FormData()
            data.append('file', this.state.selectedFile)
            let url = "https://uism-tn.com/api/Payments.php?id=" + this.props.id + "&num_mondat=" + this.state.fields.num_mondat + "&type=" + this.state.fields.type;

            axios.post(url, data, { // receive two parameter endpoint url ,form data 
            })
                .then(res => {
                    window.sessionStorage.removeItem('session');
                    // Remove all saved data from sessionStorage
                    window.sessionStorage.clear();
                    // then print response status
                    ReactDOM.render(
                        <React.StrictMode>
                            <Login />
                        </React.StrictMode>,
                        document.getElementById("root")
                    );
                }).catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Form has errors.")
        }
    }
    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });

    }
    render() {
        var type_payment = this.props.type_payment;
        window.sessionStorage.removeItem('session');
        // Remove all saved data from sessionStorage
        window.sessionStorage.clear();
        if (type_payment == 1) {
            return (
                <div className={`div_login div_inscrit align-items-center justify-content-center`}>
                    <fieldset className="border-form p-3 rounded">
                        <legend className={`rounded p-1 text-center login_form`}>
                            Payments Form
                        </legend>
                        <a href=""><img height="50px" width="50px" src="https://uism-tn.com/api/img/left.png" alt="Gauche icon" /></a>
                        <hr></hr>
                        <form name="paymentform" className="contactform" noValidate autoComplete="off" onSubmit={this.contactSubmit.bind(this)}>
                            <div className="header" style={{ color: "red" }}>Entrez votre numéro de transaction</div>
                            <p className="pcnt"><span className="spn-bold">Num RIB :</span>x x x x x xxxxxxxxxxxxxxxxxxxxxxx </p>
                            <p className="pcnt"><span className="spn-bold">Sujet :</span>Frait d'inscription  </p>
                            <hr></hr>
                            <div className="col-md-6 inpu_forms">
                                <div className="form-group">
                                    <label htmlFor="inputForCin">Numéro de transaction</label>
                                    <span className="mandatory">*</span>
                                    <input className="form-control" refs="num_mondat" type="number" size="8" minLength="8" maxLength="8" placeholder="Entrez votre numéro de transaction" onChange={this.handleChange.bind(this, "num_mondat")} value={this.state.fields["num_mondat"]} />
                                    <span style={{ color: "red" }}>{this.state.errors["num_mondat"]}</span>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputForCin">Type Payment</label>
                                    <span className="mandatory">*</span>
                                    <select refs="type" name="type" className="form-control" id="type" onChange={this.handleChange.bind(this, "type")} value={this.state.fields["type"]} disabled>

                                        <option value="2" selected>Virement bancaire</option>
                                    </select>
                                    <span style={{ color: "red" }}>{this.state.errors["type"]}</span>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputForPhone">Fichier jointure</label>
                                        <span className="mandatory">*</span>
                                        <input type="file" refs="files" className="form-control file_input" name="upload_file" onChange={this.handleInputChange} value={this.state.fields["files"]} />
                                        <span style={{ color: "red" }}>{this.state.errors["files"]}</span>
                                    </div>
                                </div>
                                {/*
                            <div className="form-group">
                                <label htmlFor="inputForPhone">Fichier jointure</label>
                                <span className="mandatory">*</span>
                                <input className="form-control file_input" refs="files" type="file"  placeholder="Enregister votre mondat ici" onChange={this.handleChange.bind(this, "files")} value={this.state.fields["files"]}/>
                                <span style={{color: "red"}}>{this.state.errors["files"]}</span> 
                            </div>
                            
                            */}
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
        } else if (type_payment == 3) {
            return (
                <div className={`div_login div_inscrit align-items-center justify-content-center`}>
                    <fieldset className="border-form p-3 rounded">
                        <legend className={`rounded p-1 text-center login_form`}>
                            Payments Form
                        </legend>
                        <a href=""><img height="50px" width="50px" src="https://uism-tn.com/api/img/left.png" alt="Gauche icon" /></a>
                        <div className="header div_error">Vouez attendre l'administrateur pour verifier votre mandat !
                        </div>
                    </fieldset>
                </div>
            )
        } else {
            return (
                <div className={`div_login div_inscrit align-items-center justify-content-center`}>
                    <fieldset className="border-form p-3 rounded">
                        <legend className={`rounded p-1 text-center login_form`}>
                            Payments Form
                        </legend>
                        <a href=""><img height="50px" width="50px" src="https://uism-tn.com/api/img/left.png" alt="Gauche icon" /></a>
                        <div className="header div_error">Votre numéro de mandat n'est pas valide contacter l'administrateur pour validé votre mandats<br>
                        </br>
                            <p>Tel : +216 51 753 323</p>
                        </div>
                    </fieldset>
                </div >
            )
        }

    }
}
export default Payments