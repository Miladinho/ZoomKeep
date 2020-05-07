'use strict';

const UserManager = require('./UserManager.js')

module.exports = class App {
    constructor(userDB) {
        let userManager = new UserManager(userDB)

        this.createUser = async (email, password, name) => {
            try {
                const user = await userManager.createUser(email, password, name)
                return { name: user.getName(), email: user.getEmail() }
            } catch (error) {
                throw error
            }
        }
    }
}
