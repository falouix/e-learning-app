import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";
import { mainUser, contactsMessages, Message } from './Users'
import Avatar from './Avatar'
import ContactBox from './ContactBox'
import MessagesBox from './MessagesBox'
import ChatInputBox from './ChatInputBox'
import Search from './Search'
import Welcome from './Welcome'

import axios from 'axios'
import './App.css'
import $ from "jquery"

function Dashboard() {
  const [data, setData] = useState(contactsMessages)
  const [contactSelected, setContactSelected] = useState({})
  const [currentMessages, setCurrentMessages] = useState([])
  const [message, setMessage] = useState('')
  const [search, setSearch] = useState('')
  const [filteredContacts, setFilterContacts] = useState([])
  const [matiere, setMatiere] = useState([])
  const [lenght, setLenght] = useState('')

  useEffect(() => {
    fetch("https://uism-tn.com/api/ListeUser.php?seance=10&type=" + JSON.parse(sessionStorage.session).type)
      .then(res => res.json())
      .then(
        (result) => {
          setFilterContacts(result);
          setMatiere(result);
          setData(result)
          localStorage.setItem('myData', JSON.stringify(result));
        },
      )

    function isObject(object) {
      return object != null && typeof object === 'object';
    }
    function deepEqual(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
          areObjects && !deepEqual(val1, val2) ||
          !areObjects && val1 !== val2
        ) {
          return false;
        }
      }

      return true;
    }
    var row_conts = {};
    function testtime() {
      const timer = setTimeout(() => {
        axios.get("https://uism-tn.com/api/getRowMessage.php?seance=" + JSON.parse(window.sessionStorage.seance) + "&id_niveau=1&type=" + JSON.parse(sessionStorage.session).type, {})
          .then((response) => {
            if (JSON.parse(window.sessionStorage.seance) != 0) {
              if (!deepEqual(response.data, row_conts)) {
                console.log("row_conts : ", row_conts);
                fetch("https://uism-tn.com/api/ListeUser.php?seance=" + JSON.parse(window.sessionStorage.seance) + "&type=" + JSON.parse(sessionStorage.session).type)
                  .then(res => res.json())
                  .then(
                    (result) => {
                      var elements = document.getElementsByClassName(contactSelected.id + '_span');
                      for (var i = 0; i < elements.length; i++) {
                        console.log(elements[i].textContent.length)
                        if (elements[i].textContent.length > 0) {
                          elements[i].style.display = 'none';
                        }
                      }
                      setFilterContacts(result);
                      setMatiere(result);
                      setData(result)
                      localStorage.setItem('myData', JSON.stringify(result));
                    },
                  )

                row_conts = response.data;
                console.log("row_conts : ", row_conts);
              }
            }

          }, (error) => {
            console.log(error);
          });
        testtime();
      }, 3000);
    }
    testtime();
  }, [])
  var rows = Array();
  useEffect(() => {
    const currContact = data.find((d) => d.contact.id === contactSelected.id)
    //console.log(currContact);
    setCurrentMessages((currContact && currContact.messages) || [])
    filterContacts(data, search)
  }, [contactSelected, data, search])

  function pushMessage() {
    if (JSON.parse(sessionStorage.session).type == "etudiant") {
      axios.post("https://uism-tn.com/api/SendMessage.php?id_seance=" + JSON.parse(window.sessionStorage.seance), {
        id_enseignant: contactSelected.id,
        id_etudiant: JSON.parse(sessionStorage.session).id_etudiant,
        message: message,
        type: 'Question',
        date: new Date(),
        Msg_readed: 1

      })
        .then(
          (result) => {
            fetch("https://uism-tn.com/api/ListeUser.php?seance=" + JSON.parse(window.sessionStorage.seance) + "&type=" + JSON.parse(sessionStorage.session).type)
              .then(res => res.json())
              .then(
                (result) => {
                  setFilterContacts(result);
                  setMatiere(result);
                  setData(result)
                  localStorage.setItem('myData', JSON.stringify(result));
                },
              )
          },
        )
    } else if (JSON.parse(sessionStorage.session).type == "enseignant") {
      axios.post("https://uism-tn.com/api/SendMessage.php?id_seance=" + JSON.parse(window.sessionStorage.seance), {
        id_etudiant: contactSelected.id,
        id_enseignant: JSON.parse(sessionStorage.session).id_enseignant,
        message: message,
        type: 'Repense',
        date: new Date(),
        Msg_readed: 1

      })
        .then(
          (result) => {
            fetch("https://uism-tn.com/api/ListeUser.php?seance=" + JSON.parse(window.sessionStorage.seance) + "&type=" + JSON.parse(sessionStorage.session).type)
              .then(res => res.json())
              .then(
                (result) => {
                  setFilterContacts(result);
                  setMatiere(result);
                  setData(result)
                  localStorage.setItem('myData', JSON.stringify(result));
                },
              )
          },
        )
    }
    const data = matiere;
    const index = data.findIndex((d) => d.contact.id === contactSelected.id)
    const newData = Object.assign([], data, {
      [index]: {
        contact: contactSelected,
        messages: [...data[index].messages, new Message(true, message, new Date())],
      },
    })

    setData(newData)
    setMessage('')
  }
  function pushVocal() {

  }
  function filterContacts(data, search) {
    const result = filteredContacts.filter(({ contact }) => {
      return !search || contact.name.toLowerCase().includes(search.toLowerCase())
    })

    if (search === '') {
      setFilterContacts(matiere)
    } else {
      setFilterContacts(result)
    }

  }

  return (

    //console.log(filteredContacts),
    <div className="Dashboard">
      <aside>
        <header>
          <Avatar user={mainUser} />
        </header>
        <Search search={search} setSearch={setSearch} />
        <div className="contact-boxes">
          {filteredContacts.map(({ contact, messages }) => (

            <ContactBox
              contact={contact}
              key={contact.id}
              setContactSelected={setContactSelected}
              messages={messages}
              id_recive={contactSelected}
              id_sender={JSON.parse(sessionStorage.session)}
            />
          ))}
        </div>
      </aside>
      {contactSelected.id ? (
        <main>
          <header>
            <Avatar user={contactSelected} showName />
          </header>
          <MessagesBox messages={currentMessages} />
          <ChatInputBox message={message} setMessage={setMessage} pushVocal={pushVocal} pushMessage={pushMessage} />
        </main>
      ) : (
          <Welcome />
        )}
    </div>
  )
}

export default Dashboard
