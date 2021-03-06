'use strict';

const User = require('./User.js')

module.exports = class UserManager {
    constructor() {}

    /**
     * Create a new user object
     * @param {string} email 
     * @param {string} password 
     * @param {string} name
     * @return {User} User object from params
     */
    createUser(email, password, name) {
        throw new Error('Must provide implementation')
    }

    /**
     *  Retrieve a User if it exists
     * @parm {string} email
     * @return {User|null}
     */
    getUser(email) {
        throw new Error('Must provide implementation')
    }
}
