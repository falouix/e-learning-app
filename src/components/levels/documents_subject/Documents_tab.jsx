import React, { useState, Component } from "react";
import Documents_form from "./Documents_form";
import ReactDOM from "react-dom";
import axios from "axios";
import Url from "../../../api/Apiurl";
import DownloadLink from "react-download-link";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { FcDownload } from "react-icons/fc";
import { FiEdit, FiXOctagon } from "react-icons/fi";
import Translate from "react-translate-component";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import Avatar from "@material-ui/core/Avatar";
import Counterpart from "counterpart";
import en from "../../../languages/en-US";
import ar from "../../../languages/ar-TN";
class Documents_details extends Component {
  getUsersNames(row){
    const UserName="";
    var posturl = Url.url + "Levels/Documents/getUsersName.php";
    axios.post(posturl,
      {
        id_users:row.id_users
      }
    )
    .then((data) => {
      console.log(data.data.users[0])
      if(data.data.users[0]!=undefined){
      console.log("Users names: ",data.data.users[0].prenom_users);
      ReactDOM.render(
        data.data.users[0].prenom_users,
        document.getElementById(row.id_documents)   
      );}
      else{
        console.log("Users names: ","---");
        ReactDOM.render(
          "---",
          document.getElementById(row.id_documents)   
        );
      }
    })
    
  }
  
  columns = [
    {
      dataField: "nom_reelle_document",
      text: Counterpart.translate("document_name"),
      sort: true,
    },
    {
      dataField: "added_date",
      text: Counterpart.translate("date_documents"),
      sort: true,
    },
    {
      dataField: "",
      text: Counterpart.translate("who_add_this"),
      sort: true,
      formatter: (cell, row) => (
        <>
        <div id={row.id_documents}>{this.getUsersNames(row)}</div>
        </>
         
        
     )
    },
    {
      dataField: "",
      text: <Translate type="text" content="actions" />,
      sort: true,
      formatter: (cell, row) => (
        <div>

       <button
            id={row.id_documents}
            className="btn btn-outline-info  btn-sm margin_left_6 "
            onClick={()=>{this.downloadfile(row.id_documents)}}  
    >
          <FcDownload />
            </button>
    
          <button
            className="btn btn-outline-danger btn-sm margin_left_6 "
            onClick={()=>{this.deletefile(row.id_documents)}}  

          >
            <FiXOctagon />
          </button>
        </div>
      ),
    },
  ];

  deletefile(id){
const id_doc = id;
var posturl = Url.url + "Levels/Documents/deletSingleDocument.php";
  axios
  .post(posturl,
    {
      id:id_doc
    }
  )
  .then(({data}) => {
     console.log(data);
     if (data.msg ="File  was deleted!"){

   
   var posturl = Url.url + "Levels/Documents/getDocuments.php";
     console.log("tab_doc_props",this.props.id)
     axios
     .post(posturl,
       {
         id:this.props.id
       }
     )
     .then((res) => {
      
       console.log("data back",res.data);
       ReactDOM.render(
         <React.Fragment>
           <ToolkitProvider
             keyField="name"
             data={res.data.docs}
             columns={this.columns}
             search
           >
             {(props) => (
               <div>
                 
                 <BootstrapTable
                   {...props.baseProps}
                   pagination={paginationFactory()}
                 />
               </div>
             )}
           </ToolkitProvider>
         </React.Fragment>,
         document.getElementById("tttt")
       );
     });
    }
  });

  }

downloadfile(id)  {
 // event.preventDefault();
console.log(id);
const id_doc = id;


var posturl = Url.url + "Levels/Documents/getSingleDocument.php";
 
  axios
  .post(posturl,
    {
      id:id_doc
    }
  )
  .then((res) => {
     
    console.log(res.data.doc[0]['directory']);

    const element = document.createElement("a");

   element.href = 'https://uism-tn.com/'+res.data.doc[0]['directory'] ;
    element.download = res.data.doc[0]['nom_documents'];
    document.body.appendChild(element);
    element.click();
  
  });


  };
  render() {
    var posturl = Url.url + "Levels/Documents/getDocuments.php";
    console.log("tab_doc_props",this.props.id)
    axios
    .post(posturl,
      {
        id:this.props.id
      }
    )
    .then((res) => {
     
      console.log("data back",res.data);
      ReactDOM.render(
        <React.Fragment>
          <ToolkitProvider
            keyField="name"
            data={res.data.docs}
            columns={this.columns}
            search
          >
            {(props) => (
              <div>
                
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider>
        </React.Fragment>,
        document.getElementById("tttt")
      );
    });

    return <div id="tttt"></div>;
  }
}
export default Documents_details;
