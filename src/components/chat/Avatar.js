import React, { useContext, useState, useEffect } from 'react'
import $ from "jquery";
import axios from 'axios'
export default function Avatar({ user, showName }) {
   /* if(JSON.parse(sessionStorage.session).type == "etudiant"){
        var src = 'https://uism-tn.com/api/img/enseignant/'+user.id+'.jpg'
    }else if(JSON.parse(sessionStorage.session).type == "enseignant"){
        var src = 'https://uism-tn.com/api/img/etudiant/'+user.id+'.jpg'
    }else{
        var src = 'https://uism-tn.com/api/img/users/'+user.id+'.jpg'
    }*/
    

    if(user.avatar != ''){
        return (
            <div className="avatar-component">
                <img className="avatar avatar_msgs" src={user.avatar} alt="" />
                {showName && <h3 className="avatar-title">{user.name}</h3>}
            </div>
        )
    }else{ 
        return (
            <div className="avatar-component">
                <span id={"firstName"+user.id} className="hidden">{user.name}</span>
                
                <div id="avatarbig">
                  <div id={"avatar_msg"+user.id} className="avatar_msg">{(user.name).charAt(0)}</div>
                </div>
                {showName && <h3 className="avatar-title">{user.name}</h3>}
            </div>
        )
    }
    
}
