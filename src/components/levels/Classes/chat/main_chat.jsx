import React,{useState,useRef,useEffect}from 'react';
import PublicChat from './PublicChat';
import PrivateChat from './PrivateChat';
import ReactDOM from "react-dom";
import io from 'socket.io-client';
import { BiTrash } from "react-icons/bi";
let socket;
let msgsItems;
const Main_chat =  (classData) =>{
	//
	const roomType=1;
    const data_session_storage = JSON.parse(window.sessionStorage.getItem('session'));
	const idClass = JSON.parse(window.sessionStorage.getItem('seance'));
    const [ state, setState ] = useState({ message: "", name: "" });
	var [ chat, setChat ] = useState([]);
	var [ msgsPrvt,setMsgsPrvt] = useState([]);
	var [msgsPblc,setMsgspblc] = useState([]);
	var [ classItem, setClassItem ] = useState({});
	var [ studentsOnline, setStudentsOnline ] = useState([]);
	var inputMsg= useRef(null);
	var connectionOptions =  {
		"force new connection" : true,
		"reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
		"timeout" : 10000,                  //before connect_error and connect_timeout are emitted.
		"transports" : ["websocket"]
	};
	useEffect(
		() => {
			console.log("id sceance:",idClass)
			socket = io.connect("https://serv.uism-tn.com:8081/",connectionOptions);
			//student section
			if(data_session_storage.type=="etudiant"){
				socket.emit('studentJoinClass',{
				studentID:data_session_storage.id_etudiant, 
				studentName:data_session_storage.nom_etudiant,
				classID:idClass
				}
			);
			socket.on('studentJoinBack',(classItem)=>{
				console.log("classItem",classItem);
				ReactDOM.render(
					<PrivateChat msgs={classItem}/>,
					document.getElementById('messages_items')
				)
			});
			//if there is old messages
			socket.on("teacherSendMsgPublic", (messageItem)=>{
				msgsPblc=messageItem;
				console.log("msgs comes from server" ,messageItem)
				console.log("local public msgs" ,msgsPblc)
				
				ReactDOM.render(
					<PublicChat msgData={msgsPblc}/>,
				document.getElementById('messages_items')
			)
			});
			}
            //teacher section
			if(data_session_storage.type=="enseignant"){
					//
				socket.emit('teacherStartTheClass',{
				teacherID:data_session_storage.id_enseignant, 
				teacherName:data_session_storage.nom_enseignant,
				classID:idClass
			    }
				);
				socket.on('teacherStartBack',classItem=>{
					//save localy classItem
					setClassItem(classItem)
					ReactDOM.render(
						<ul>
							{
							classItem.students.map(item=>{
						        return(
								<li className="Students_listli">
									{item.studentName}
								</li>
								)
								})	
							}
						</ul>,
						document.getElementById('Student_list')
					)
					ReactDOM.render(
							<PublicChat msgData={classItem.messages.publicMsgs}/>,
						document.getElementById('messages_items')
					)
					

				}
				);
				socket.on('newStudentConnected',(students)=>{
					console.log("students oline",students);
					let studentsOnlineItems = students.map((studentItem)=>{
						return(
							<li className="Students_listli">
							  <div class="bubble">
								<span class="bubble-outer-dot">
								<span class="bubble-inner-dot"></span>
								</span>
							  </div>
								{studentItem.studentName}
							</li>
						)
					})
					ReactDOM.render(
					  <ul className="Students_listul">
						  {studentsOnlineItems}
					  </ul>,
					  document.getElementById("Student_list")
					)
				})
                //get studentsOnline
				socket.on("getStudentsOnline",(students)=>{
                      setStudentsOnline(students);
					  console.log("students oline",students);
					  let studentsOnlineItems = students.map((studentItem)=>{
						  return(
							  <li className="Students_listli">{studentItem.studentName}</li>
						  )
					  })
                      ReactDOM.render(
						<ul className="Students_listul">
							{studentsOnlineItems}
						</ul>,
						document.getElementById("Student_list")
					  )
				})
				socket.on("teacherSendMsgPublic", ({teacherID,classID,msg})=>{
					console.log({teacherID,classID,msg})
				});
                
				//if a student truying to send Msg
				socket.on("studentSendMsg",({msg,sender,reciever})=>{
                      console.log("the student",sender,"send you",msg)
				  })
			}else{
				socket.emit('join-room',data_session_storage.id_users, data_session_storage.nom_users,idClass);
			}
			
		},
		[ chat ]
	)
	//teacher trying to save chat room data
    const saveMsgs = (e) => {
		e.preventDefault();
      socket.emit("saveMsgs",{
		teacherID:data_session_storage.id_enseignant,
		classID:idClass
		});
	}
	const onTextChange = (e) => {
		setState({message:e.target.value, name: data_session_storage.nom_users})
	}

	const onMessageSubmit = (e) => {
        e.preventDefault()
		if(data_session_storage.type=="enseignant"){
			console.log("data send by the teacher",{
				teacherID:data_session_storage.id_enseignant,
				classID:idClass,
				msg:inputMsg.current.value,
			})
        socket.emit("teacherSendMsg", ({
			teacherID:data_session_storage.id_enseignant,
			classID:idClass,
			msg:inputMsg.current.value,
		}));
	}
	if(data_session_storage.type=="etudiant"){
		socket.emit("studentSendMsg", ({ 
			studentID :data_session_storage.id_etudiant,
			classID:idClass,
			msg:inputMsg.current.value 
		}))
	}
	inputMsg.current.value="";
	}

	const renderChat = () => {
		ReactDOM.render(  
		<ul>
            {chat.msgs.map((item, index) => {
				if(data_session_storage.type=="etudiant"){
						return(
						<li key={index}>
							<div className="messaging_div ">
								<div className="msg-container">
								<button className="btn btn-success delete_btn_msg">
										<BiTrash/>
								</button>
									<span className="sender_span">{item.user}</span>
								</div>
								<p className="message_span">{item.msg}</p>
							</div>
						</li>
							)
				}else{
						return(
							<li key={index}>
								<div className="messaging_div ">
									<button className="btn btn-success delete_btn_msg">
										<BiTrash/>
									</button>
										<span className="sender_span">
											{msgsItems}
										</span>
									<p className="message_span">
									</p>
								</div>
							</li>
								)
					}
					}
				)
			}
        </ul>,
		document.getElementById('messages_items'));
	}
	if(data_session_storage.type=="etudiant"){
		return (
			<div className="card">
				<div className="render-chat" id="messages_items">
				<PublicChat/>
				</div>
				<form >
					<div>
						<textarea
							name="message"
							onChange={(e) => onTextChange(e)}
							ref={inputMsg}
							id="outlined-multiline-static"
							variant="outlined"
							label="نص الرسالة"
							className="msgText_area"
						/>
					</div>
				</form>
				<div>
				<button 
					className="message-send-btn btn btn-success btnrt  Subject_save_btn"
					onClick={onMessageSubmit}
					>
						Send Message
					</button>
					</div>
			</div>
		)
	}else{
		
	return (
		<div className="card">
			<div className="render-chat" id="messages_items">
			<PublicChat/>
			</div>
			<form >
				<div>
					<textarea
						name="message"
						onChange={(e) => onTextChange(e)}
						ref={inputMsg}
						id="outlined-multiline-static"
						variant="outlined"
						label="نص الرسالة"
						className="msgText_area"
					/>
				</div>
			</form>
            <div>
            <button 
                className="message-send-btn btn btn-success btnrt  Subject_save_btn"
                onClick={onMessageSubmit}
                >
                    Send Message
            </button>
			<button
			 onClick={saveMsgs}
			>
				Save Chat
			</button>
            </div>
		</div>
	)
	}

}
export default Main_chat;