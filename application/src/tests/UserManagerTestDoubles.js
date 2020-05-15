'use strict;'

const User = require('../User')
const UserManager = require('../UserManager')
const {
    validEmail,
    validPwd,
    validName,
    role
} = require('./inputs/goodInputs')

module.exports.UserManagerSpy = class extends UserManager {
    constructor() {
        super()
        this.invokedCreateUser = false
        this.invokedGetUser = false
    }
    createUser() {
        this.invokedCreateUser = true 
    }

    getUser() {
        this.invokedGetUser = true
    }
}

module.exports.AcceptingUserManagerSpy = class extends module.exports.UserManagerSpy {
    constructor() {
        super()
    }
    createUser() {
        this.invokedCreateUser = true 
        return Promise.resolve(new User(validEmail, validPwd, validName, role))
    }

    getUser() {
        this.invokedGetUser = true
        return Promise.resolve(new User(validEmail, validPwd, validName, role))
    }
}

module.exports.RejectingUserManagerSpy = class extends module.exports.UserManagerSpy {
    constructor() {
        super()
    }
    createUser() {
        this.invokedCreateUser = true 
        return Promise.resolve(null)
    }

    getUser() {
        this.invokedGetUser = true
        return Promise.resolve(null)
    }
}
