'use strict';

class EmailExistsError extends Error {
    constructor(message) {
        super('EmailExistsError')
        this.name = 'EmailExistsError'
    }
}

class InvalidEmailError extends Error {
    constructor(message) {
        super('InvalidEmailError')
        this.name = 'InvalidEmailError'
    }
}

class InvalidPasswordError extends Error {
    constructor(message) {
        super('InvalidPasswordError')
        this.name = 'InvalidPasswordError'
    }
}

class InvalidNameError extends Error {
    constructor(message) {
        super('InvalidNameError')
        this.name = 'InvalidNameError'
    }
}

class InvalidCredentialsError extends Error {
    constructor(message) {
        super('InvalidCredentialsError')
        this.name = 'InvalidCredentialsError'
    }
}

module.exports = {
    EmailExistsError : EmailExistsError,
    InvalidEmailError : InvalidEmailError,
    InvalidPasswordError : InvalidPasswordError,
    InvalidNameError : InvalidNameError,
    InvalidCredentialsError : InvalidCredentialsError
}
