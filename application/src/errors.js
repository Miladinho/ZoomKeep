'use strict';

module.exports.EmailExistsError = class extends Error {
    constructor(message) {
        super('EmailExistsError')
        this.name = 'EmailExistsError'
    }
}

module.exports.InvalidEmailError = class extends Error {
    constructor(message) {
        super('InvalidEmailError')
        this.name = 'InvalidEmailError'
    }
}

module.exports.InvalidPasswordError = class extends Error {
    constructor(message) {
        super('InvalidPasswordError')
        this.name = 'InvalidPasswordError'
    }
}

module.exports.InvalidNameError = class extends Error {
    constructor(message) {
        super('InvalidNameError')
        this.name = 'InvalidNameError'
    }
}

module.exports.InvalidCredentialsError = class extends Error {
    constructor(message) {
        super('InvalidCredentialsError')
        this.name = 'InvalidCredentialsError'
    }
}

module.exports.UnauthorizedAccessError = class extends Error {
    constructor(message) {
        super('UnauthorizedAccessError')
        this.name = 'UnauthorizedAccessError'
    }
}

module.exports.EmailDoesNotExistError = class extends Error {
    constructor(message) {
        super('EmailDoesNotExistError')
        this.name = 'EmailDoesNotExistError'
    }
}
