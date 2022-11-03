import React, { useRef, useEffect } from 'react'
import Message from './Message'


export default function MessagesBox({ messages,id_recive,id_sender }) {
    
    const endDiv = useRef(null)
    useEffect(() => {
        endDiv.current.scrollIntoView()
    }, [messages])
    return (
        
        <div className="chats" id="chats">
            
            {messages

                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((m) => (
                    <Message message={m} key={m.id} />
                ))}
            <div style={{ float: 'right', clear: 'both' }} ref={endDiv}></div>
        </div>
    )
}
