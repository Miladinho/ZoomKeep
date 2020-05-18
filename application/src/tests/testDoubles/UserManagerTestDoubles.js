'use strict;'

const User = require('../../User')
const UserManager = require('../../UserManager')
const {
    validEmail,
    validPwd,
    validName,
    role
} = require('../inputs/goodInputs')

module.exports.UserManagerSpy = class extends UserManager {
    constructor() {
        super()
        this.invokedCreateUser = false
        this.invokedGetUser = false
        this.invokations = new Map()
    }
    invokeMethod(methodName) {
        this.invokations.set(methodName, (this.invokations.get(methodName) || 0) + 1)
    }

    invokationsCount() {
        return this.invokations.size
    }
}

module.exports.AcceptingUserManagerSpy = class extends module.exports.UserManagerSpy {
    constructor() {
        super()
    }
    createUser() {
        this.invokedCreateUser = true
        this.invokeMethod('createUser')
        return Promise.resolve(new User(validEmail, validPwd, validName, role))
    }

    getUser() {
        this.invokedGetUser = true
        this.invokeMethod('getUser')
        return Promise.resolve(new User(validEmail, validPwd, validName, role))
    }
}

module.exports.RejectingUserManagerSpy = class extends module.exports.UserManagerSpy {
    constructor() {
        super()
    }
    createUser() {
        this.invokedCreateUser = true
        this.invokeMethod('createUser')
        return Promise.resolve(null)
    }

    getUser() {
        this.invokedGetUser = true
        this.invokeMethod('getUser')
        return Promise.resolve(null)
    }
}
