'use strict';

const { InvalidEmailError, 
        EmailExistsError,
        InvalidPasswordError,
        InvalidNameError
    } = require('./errors.js')
const User = require('./User.js')

module.exports = class UserManager {
    constructor(manager) {
        let dbManager = manager

        this.setDBManager = (manager) => {
            dbManager = manager
        }
        
        this.getUser = async (email) => {
            return dbManager.getUser(email)
        }

        this.createUser = async (email, password, name) => {
            if (!email)
                throw new InvalidEmailError()
            if (!password)
                throw new InvalidPasswordError()
            if (!this.isValidName(name))
                throw new InvalidNameError()
            try {
                return await dbManager.createUser(new User(email, password, this.normalizeName(name)))
            } catch (error) {
                throw new EmailExistsError()
            }
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
