import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
const faker = require('faker')

export class User {
    
    constructor() {
        //this.id = faker.random.uuid()
        //this.name =  faker.name.findName()
        //this.avatar = faker.internet.avatar()
        
    }
    
}
export class Message {
    constructor(isMainUser, msg, date) {
        
        this.id = faker.random.uuid()
        this.msg = msg  //faker.lorem.words(faker.helpers.randomize([...Array(20).keys()]))
        this.isMainUser = isMainUser
        this.date = date || faker.date.recent()

        //console.log( this.msg)
    }
   
}

const Users = []  
if (typeof Users.length == 0 && Users == null){
     Users = JSON.parse(localStorage.myData);
}

export const mainUser = Users;

export const contacts = Users;

export const contactsMessages = contacts.map((contact) => {
    return {
        contact,
        messages: [...Array(50).keys()]
            .map((_, i) => {
                return new Message(true) 
            })
            .filter((m) => m.msg),
            
    }
})
