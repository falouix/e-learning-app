import React from 'react'
import emojiIcon from '../../assets/tag_faces.svg'
import micIcon from '../../assets/mic.svg'
import sendIcon from '../../assets/send.svg'

export default function ChatInputBox({ message, setMessage, pushMessage, pushVocal }) {
    function handleKeyDown(e) {
        
            if (e.key === 'Enter' && message) {
                pushMessage()
            }

    }
    let elm = document.getElementsByClassName('micIcon');
    let SendMessage;
    if(JSON.parse(sessionStorage.session).type !== 'user'){
        if(!message){
            SendMessage = <div className={`icon send ${message ? 'sendIcon' : 'micIcon'}`} onClick={pushVocal} >
            <img src={message ? sendIcon : micIcon} alt="" />
            </div>
        }else{
            SendMessage = <div className={`icon send ${message ? 'sendIcon' : 'micIcon'}`} onClick={pushMessage} >
            <img src={message ? sendIcon : micIcon} alt="" />
            </div>
        }
        return (
            <div className="chat-input-box">
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                {SendMessage}
            </div>
        )
    }else{
        return (
            <div >
               
            </div>
        )
    }
    
}
