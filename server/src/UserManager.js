'use strict';

const { InvalidEmailError, 
        EmailExistsError,
        InvalidPasswordError,
        InvalidNameError
    } = require('./errors.js')

module.exports = class UserManager {
    constructor(manager) {
        let dbManager = manager

        this.setDBManager = (manager) => {
            dbManager = manager
        }
    
        this.createUser = async (user) => {
            if (!user.email)
                throw new InvalidEmailError()
            if (!user.password)
                throw new InvalidPasswordError()
            if (!this.isValidName(user.name))
                throw new InvalidNameError()
            
            user.name = this.normalizeName(user.name)
            try {
                await dbManager.createUser(user)
                return user
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
