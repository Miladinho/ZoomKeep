'use strict;'

module.exports.AuthorizerSpy = class {
    constructor() {
        this.invokedLogin = false
    }

    getUser() {
        this.invokedLogin = true
    }
}

module.exports.RejectingAuthorizerStub = class extends module.exports.AuthorizerSpy {
    constructor() {
        super()
    }
    login() {
        this.invokedLogin = true
        let error = new Error()
        error.name = 'InvalidCredentialsError'
        return Promise.reject(error)
    }
}
