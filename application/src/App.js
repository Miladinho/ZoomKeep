'use strict';

const UserManager = require('./UserManager')
const Validator = require('validator')
const {
    isValidName,
    hasQuotedString
} = require('./helpers')
const { 
    InvalidEmailError,
    InvalidPasswordError,
    InvalidNameError,
    InvalidCredentialsError,
    EmailExistsError,
    UnauthorizedAccessError,
    EmailDoesNotExistError
 } = require('./errors.js')

module.exports = class App {
    constructor(userManager, authorizer) {
        this._userManager = userManager || new UserManager()
        this._authorizer = authorizer
    }

    /**
     * Set a new UserManager instance
     * @param {UserManager} userManager 
     * @returns Void
     */
    setUserManager(manager) {
        this._userManager = manager
    }

    /**
     * Set a new Authorizer instance
     * @param {Authorizer} authorizer 
     * @returns Void
     */
    setAuthorizer(authorizer) {
        this._authorizer = authorizer
    }

    /**
     * Create a new User
     * @param {string} email
     * @param {string} password
     * @param {string} name
     * @param {string} role
     * @return {Promise} Promise - object that contains user email
     */
    async addUser(email, password, name, role, authToken) {
        if (!await this._authorizer.isAuthorized(authToken,['admin']))
            return Promise.reject(new UnauthorizedAccessError())
        if (!email || !Validator.isEmail(email) || hasQuotedString(email))
            return Promise.reject(new InvalidEmailError())
        if (!password)
            return Promise.reject(new InvalidPasswordError())
        if (!isValidName(name))
            return Promise.reject(new InvalidNameError())
        if (null !== await this._userManager.getUser(email))
            return Promise.reject(new EmailExistsError())
        try {
            const user = await this._userManager.createUser(email, password, name, role)
            return Promise.resolve(user.serializeToJSON())
        } catch (error) {
            return Promise.reject(error)
        }
    }
    /**
     * Authenticates a user
     * @param {string} email 
     * @param {string} password 
     */
    async login(email, password) {
        if (!Validator.isEmail(email) || hasQuotedString(email))
            return Promise.reject(new InvalidCredentialsError())
        const user = await this._userManager.getUser(email)
        if (!user)
            return Promise.reject(new EmailDoesNotExistError())
        if (user.getPassword() !== password)
            return Promise.reject(new InvalidCredentialsError())
        await this._authorizer.authorize(user)
        return Promise.resolve({ authToken: user.getAuthToken() })
    }
    /**
     * Post a video if authorized
     * @param {*} authToken 
     * @param {*} postingUserID 
     * @param {*} video 
     */
    async uploadVideo(authToken, postingUserID, video) {
        const isValidToken = await this._authorizer.isAuthorized(authToken)
        const isAuthorized = ''
        if (!isValidToken || !isAuthorized)
            return Promise.reject(new UnauthorizedAccessError())
        const user = this._userManager.getUser(email)
    }
}
