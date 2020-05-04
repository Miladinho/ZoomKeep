'use strict';

const { InvalidEmailError, 
        EmailExistsError,
        InvalidPasswordError,
        InvalidNameError
    } = require('./errors.js')

module.exports = class UserManager {
    constructor(dbManager) {
        this.dbManager = dbManager
    }

    setDBManager(manager) {
        this.dbManager = manager
    }

    async createUser(email, password, name) {
        if (!email)
            throw new InvalidEmailError()
        if (!password)
            throw new InvalidPasswordError()
        if (!this.isValidName(name))
            throw new InvalidNameError()
        
        try {
            const userObj = {
                name: this.normalizeName(name),
                email: email,
                password: password
            }
            await this.dbManager.createUser(userObj)
            return userObj
        } catch (error) {
            throw new EmailExistsError()
        }
    }

    isValidName(name) {
        return name && name.split(' ').length >= 2
    }

    normalizeName(nameStr) {
        return nameStr
            .split(' ')
            .map( name => {
                return name
                    .split('')
                    .map( (char, i) => i == 0? char.toUpperCase() : char)
                    .join('')
            })
            .join(' ')
    }
}
