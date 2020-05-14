'use strict';

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

class InvalidPasswordError extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidPasswordError'
    }
}

class InvalidNameError extends Error {
    constructor(message) {
        super(message)
        this.name = 'InvalidNameError'
    }
}

class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message)
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
