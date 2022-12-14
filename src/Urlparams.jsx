import React, { Component } from "react";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import axios from "axios";
import Counterpart from "counterpart";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const nom = urlParams.get('nom');
class Urlparams extends Component {
    render() {
        console.log("params class component");
        return(
            <h1>test</h1>
        ) ;
    }
}

export default Urlparams;