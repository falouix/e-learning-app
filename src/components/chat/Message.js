import React from 'react'
import doubleCheck from '../../assets/done_all.svg'
import axios from 'axios'
import ReactDOM from "react-dom";

import Checkbox from "./Checkbox"
import $ from "jquery"
export default function Message({ message }) {
    
    if(JSON.parse(sessionStorage.session).type == 'etudiant'){
        if(JSON.parse(sessionStorage.session).id_etudiant == message.id_etudiant){
            return ( 
                <div className="Div_msg">
                 <div className={`message ${message.isMainUser ? 'sent' : 'received'}`}>
                     <span className="span_name_msg">{message.isMainUser ? 'Moi :' : message.name +'   :'}</span>  
                 <Checkbox id={message.id}/>
                 {message.msg}
                 <div className="metadata">
                     <span className="date">{message.date.toLocaleString()}</span>
                     {message.isMainUser && <img src={doubleCheck} alt="" className="icon-small" />}
                 </div>
             </div>
                </div>
                
            )
        }else{
            return ( 
                <div className="Div_msg">
                </div>
                
            )
        }
       
    }else if(JSON.parse(sessionStorage.session).type == 'enseignant'){
        return ( 
            <div className="Div_msg">
             <div className={`message ${message.isMainUser ? 'sent' : 'received'}`}>
                 <span className="span_name_msg">{message.isMainUser ? 'Moi :' : message.name +'   :'}</span>  
             <Checkbox id={message.id}/>
             {message.msg}
             <div className="metadata">
                 <span className="date">{message.date.toLocaleString()}</span>
                 {message.isMainUser && <img src={doubleCheck} alt="" className="icon-small" />}
             </div>
         </div>
        
            </div>
            
        )
    }else{
        return ( 
            <div className="Div_msg">
             <div className={`message ${message.isMainUser ? 'sent' : 'received'}`}>
                 <span className="span_name_msg">{message.isMainUser ? message.name +'   :' : message.name +'   :'}</span>  
             <Checkbox id={message.id}/>
             {message.msg}
             <div className="metadata">
                 <span className="date">{message.date.toLocaleString()}</span>
                 {message.isMainUser && <img src={doubleCheck} alt="" className="icon-small" />}
             </div>
         </div>
        
            </div>
            
        )
    }
    
}
