import React from 'react'
import doubleCheck from '../../assets/done_all.svg'
import Avatar from './Avatar'
import axios from 'axios'

export default function ContactBox({ contact, setContactSelected, messages, id_sender, id_recive }) {
    const maxTs = Math.max(...messages.map((m) => new Date(m.date).getTime()))
    const lastMsg = messages.find((m) => new Date(m.date).getTime() === maxTs)

    function truncate(text, length) {
        return text.length > length ? `${text.substring(0, length)} ...` : text
    }
    function UpdateCount(){
        if(JSON.parse(sessionStorage.session).type == 'enseignant'){
            axios.get("https://uism-tn.com/api/CountMsg.php?seance=10&id_niveau=1&type="+JSON.parse(sessionStorage.session).type+"&id_recive="+contact.id+"&id_sender="+id_sender.id_enseignant, {})
            .then((response) => {
            
            }, (error) => {
              console.log(error);
            });
        }else if(JSON.parse(sessionStorage.session).type == 'etudiant'){
            axios.get("https://uism-tn.com/api/CountMsg.php?seance=10&id_niveau=1&type="+JSON.parse(sessionStorage.session).type+"&id_recive="+contact.id+"&id_sender="+id_sender.id_etudiant, {})
            .then((response) => {
            }, (error) => {
              console.log(error);
            });
        }
    }
    
    if(lastMsg){
        if(lastMsg.Msg_readed == 0){
            var MsgCount = <span className={`${lastMsg.isMainUser ? 'hidden' : ''}`}></span>
        }else if(lastMsg.Msg_readed > 0){
            var MsgCount = <span className={`${lastMsg.isMainUser ? 'hidden' : lastMsg.id_etudiant+'_span count_mark'}`}>{lastMsg.Msg_readed}</span>
        }else{
            var MsgCount = <span className='hidden'></span>
        }
        if(JSON.parse(sessionStorage.session).type == 'etudiant'){
            if(JSON.parse(sessionStorage.session).id_etudiant == lastMsg.id_etudiant){
              
                return (
                    <div onClick={() => UpdateCount(id_sender)} >
                        <div className="contact-box" onClick={() => setContactSelected(contact)}>
                        <Avatar user={contact} />
                        <div className="right-section">
                            <div className="contact-box-header">
                                <h3 className="avatar-title">{contact.name}</h3>
                                <span className="time-mark">{new Date(lastMsg.date).toLocaleDateString()}</span>
                                {MsgCount}
                            </div>
                            <div className="last-msg">
                                <img src={doubleCheck} alt="" className="icon-small" />
                                <span className="text">{truncate(lastMsg.msg, 30)}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                )
            }else{
                return (
                    <div onClick={() => UpdateCount(id_sender)} >
                        <div className="contact-box" onClick={() => setContactSelected(contact)}>
                        <Avatar user={contact} />
                        <div className="right-section">
                            <div className="contact-box-header">
                                <h3 className="avatar-title">{contact.name}</h3>
                                <span className="time-mark">{new Date(lastMsg.date).toLocaleDateString()}</span>
                            </div>
                            <div className="last-msg">
                                <img src={doubleCheck} alt="" className="icon-small" />
                                <span className="text">{''}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                )
            }
        }else if(JSON.parse(sessionStorage.session).type == 'enseignant'){
            return (
                <div onClick={() => UpdateCount(id_sender)} >
                    <div className="contact-box" onClick={() => setContactSelected(contact)}>
                    <Avatar user={contact} />
                    <div className="right-section">
                        <div className="contact-box-header">
                            <h3 className="avatar-title">{contact.name}</h3>
                            <span className="time-mark">{new Date(lastMsg.date).toLocaleDateString()}</span>
                            {MsgCount}
                        </div>
                        <div className="last-msg">
                            <img src={doubleCheck} alt="" className="icon-small" />
                            <span className="text">{truncate(lastMsg.msg, 30)}</span>
                        </div>
                    </div>
                </div>
                </div>
                
            )
        }else{
            return (
                <div onClick={() => UpdateCount(id_sender)} >
                    <div className="contact-box" onClick={() => setContactSelected(contact)}>
                    <Avatar user={contact} />
                    <div className="right-section">
                        <div className="contact-box-header">
                            <h3 className="avatar-title">{contact.name}</h3>
                            <span className="time-mark">{new Date(lastMsg.date).toLocaleDateString()}</span>
                            {MsgCount}
                        </div>
                        <div className="last-msg">
                            <img src={doubleCheck} alt="" className="icon-small" />
                            <span className="text">{truncate(lastMsg.msg, 30)}</span>
                        </div>
                    </div>
                </div>
                </div>
                
            )
        }
        
    }else{
        return (
            <div className="contact-box" onClick={() => setContactSelected(contact)}>
                <Avatar user={contact} />
                <div className="right-section">
                    <div className="contact-box-header">
                        <h3 className="avatar-title">{contact.name}</h3>
                        <span className="time-mark">{new Date().toLocaleDateString()}</span>
                      
                    </div>
                    <div className="last-msg">
                        <img src={doubleCheck} alt="" className="icon-small" />
                        <span className="text">{''}</span>
                    </div>
                </div>
            </div>
        )
    }
    
}
