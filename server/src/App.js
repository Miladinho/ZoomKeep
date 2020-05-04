'use strict';

const UserManager = require('./UserManager.js')

module.exports = class App {
    constructor(userDB) {
        let userManager = new UserManager(userDB)
        
        this.createUser = async (email, password, name) => {
            const userObj = {
                name: name,
                email: email,
                password: password
            }
            return await userManager.createUser(userObj)
        }
    }
}
