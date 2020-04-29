const { InvalidEmailError, EmailExistsError } = require('./errors.js')
module.exports = class UserManager {
    async createUser(email) {
        if (!email)
            throw new InvalidEmailError()
        throw new EmailExistsError()
    }
}