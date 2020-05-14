'use strict;'

const User = require('../User')
const { EmailExistsError } = require('../errors')

module.exports.UserManagerSpy = class{
    constructor() {
         this.invokedCreateUser = false
         this.invokedLogin = false
    }
    createUser() {
        this.invokedCreateUser = true 
    }

    login() {
        this.invokedLogin =  true
    }
}

module.exports.UserManagerFake = class {
    constructor(email, password, name) {
        this.data = new Map()
    }
    createUser(email, password, name, role) {
        if (this.data.has(email))
            return Promise.reject(new EmailExistsError())
        this.data.set(email, new User(email, password, name, role))
        return Promise.resolve(this.data.get(email))        
    }
}

module.exports.UserManagerDummy = class {}
