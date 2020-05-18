"user strict;"

module.exports = class Authorizer {
    constructor() {

    }

    isAuthorized() {
        throw new Error('Must provide implementation')
    }

    authorize(user) {
        throw new Error('Must provide implementation')
    }
}
