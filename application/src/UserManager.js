'use strict';

const User = require('./User.js')

module.exports = class UserManager {
    constructor() {}

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     */
    createUser(email, password, name) {
        throw new Error('Must provide implementation')
    }
}
