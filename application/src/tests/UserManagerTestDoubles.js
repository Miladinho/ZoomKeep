'use strict;'

const User = require('../User')
const UserManager = require('../UserManager')
const { EmailExistsError } = require('../errors')

module.exports.UserManagerSpy = class extends UserManager {
    constructor() {
        super()
        this.invokedCreateUser = false
    }
    createUser() {
        this.invokedCreateUser = true 
    }
}

module.exports.UserManagerFake = class extends UserManager {
    constructor(email, password, name) {
        super()
        this.data = new Map()
    }
    createUser(email, password, name, role) {
        if (this.data.has(email))
            return Promise.reject(new EmailExistsError())
        this.data.set(email, new User(email, password, name, role))
        return Promise.resolve(this.data.get(email))        
    }
}

module.exports.UserManagerDummy = class extends UserManager {}
