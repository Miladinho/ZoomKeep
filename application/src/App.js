'use strict';

const UserManager = require('./UserManager')
const Validator = require('validator')
const { 
    InvalidEmailError,
    InvalidPasswordError,
    InvalidNameError,
    InvalidCredentialsError
 } = require('./errors.js')

module.exports = class App {
    constructor(userManager, authorizer) {
        this.userManager = userManager || new UserManager()
        this.authorizer = authorizer
    }

    /**
     * Set a new UserManager instance
     * @param {UserManager} userManager 
     * @returns Void
     */
    setUserManager(manager) {
        this.userManager = manager
    }

    setAuthorizer(authorizer) {
        this.authorizer = authorizer
    }

    /**
     * Create a new User
     * @param {string} email
     * @param {string} password
     * @param {string} name
     * @return {Promise} Promise - object that contains user email
     */
    async createUser(email, password, name, role) {
        if (!email || !Validator.isEmail(email) || this.hasQuotedString(email))
            return Promise.reject(new InvalidEmailError())
        if (!password)
            return Promise.reject(new InvalidPasswordError())
        if (!this.isValidName(name))
            return Promise.reject(new InvalidNameError())
        try {
            const user = await this.userManager.createUser(email, password, name, role)
            return Promise.resolve(user.serializeToJSON())
        } catch (error) {
            return Promise.reject(error)
        }
    }

    async login(email, password) {
        if (!Validator.isEmail(email) || this.hasQuotedString(email))
            return Promise.reject(new InvalidCredentialsError())
        try {
            const result = await this.authorizer.login(email, password)
            return Promise.resolve(result)
        } catch (error) {
            return Promise.reject(error)
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

    hasQuotedString(email) {
        return email.length > 0 ? email.charAt(0) == '"' : false
    }

}
