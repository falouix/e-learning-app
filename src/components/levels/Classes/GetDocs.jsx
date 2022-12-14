import React from 'react'
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//jquery, popper.js libraries for bootstrap modal
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js'
import $ from 'jquery';
import Translate from "react-translate-component";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
import { Document } from 'react-pdf';
import { ReactPDF } from 'react-pdf';
import Counterpart from "counterpart";
Counterpart.registerTranslations("en", en);
Counterpart.registerTranslations("ar", ar);

class Doc extends React.Component {
    constructor() {
        super();
        this.state = {
            Docs :  [],
            Pdfs : [],
         
        };
    
    }
   

componentDidMount() {
    let initialDocs = [];
    let initialPdfs = [];

  
    if (sessionStorage.getItem('seance'))  {
        const Idseance = JSON.parse(window.sessionStorage.seance);
        fetch('https://uism-tn.com/api/get_seance_docs.php?seance='+Idseance)
        .then(response => {
            return response.json();
           
    
        }).then(data => {
          console.log(data);
       initialDocs = data.seance_docs.map((doc) => {
            return  {
                src: "https://uism-tn.com/api/uploads/"+doc.nom_documents,
                href: "https://uism-tn.com/api/uploads/"+doc.nom_documents,
                thumbnail: "https://uism-tn.com/api/uploads/"+doc.nom_documents,
                thumbnailWidth: 320,
                thumbnailHeight: 174,
                isSelected: true,
                tags: [{value: doc.nom_documents, title: doc.nom_documents}],
                caption: doc.nom
               }
            
     
        
        });
        initialPdfs = data.seance_docs.map((doc) => {
       
             return  {
                 url: "https://uism-tn.com/api/uploads/"+doc.nom_documents,
          
                }
          
         
         });
      this.setState({
            Docs: initialDocs,
            Pdfs:initialPdfs,
        });
        console.log(this.state.Pdfs);
        console.log(this.state.Docs );
        console.log(this.state.Docs );
    });
    }
  
    }
    


    

render() {
    
   
    if (sessionStorage.getItem('seance'))  {
        const Idseance = JSON.parse(window.sessionStorage.seance);
      return (
        <React.Fragment>
 <Translate content="seance_docs" component="h3" />
 <Gallery images={this.state.Docs}/>
 <Document
  file= "https://uism-tn.com/api/uploads/readme.pdf"
/>
       </React.Fragment>
      );
    }else{
        return (
            <React.Fragment>
     <Translate content="seance" component="h3" />
  
           </React.Fragment>
          );

    }
  
      }
    
   
  }
  export default Doc;