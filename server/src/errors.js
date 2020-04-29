
class EmailExistsError extends Error {
    constructor(message) {
        super(message)
        this.name = 'EmailExistsError'
    }
}

class InvalidEmailError extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidEmailError'
    }
}

module.exports = {
    EmailExistsError : EmailExistsError,
    InvalidEmailError : InvalidEmailError
}