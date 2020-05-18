"use strict;"

const Authorizer = require('../../Authorizer')

class AuthorizerSpy extends Authorizer {
    constructor() {
        super()
        this.invokations = new Map()
    }

    invokeMethod(methodName) {
        this.invokations.set(methodName, (this.invokations.get(methodName) || 0) + 1)
    }

    invokationsCount() {
        return this.invokations.size
    }

    didInvokeMethod(methodName) {
        return this.invokations.has(methodName)
    }
}

module.exports.AcceptingAuthorizerSpy = class extends AuthorizerSpy {
    constructor() { super() }
    isAuthorized() {
        this.invokeMethod('isAuthorized')
        return Promise.resolve(true)
    }
}

module.exports.RejectingAuthorizerSpy = class extends AuthorizerSpy {
    constructor() { super() }
    isAuthorized() {
        this.invokeMethod('isAuthorized')
        return Promise.resolve(false)
    }
}

module.exports.AcceptingAuthorizerStub = class extends Authorizer {
    constructor() {
        super()
        this.STUB_AUTHORIZER = 'validAuthToken'
    }

    authorize(user) {
        user.setAuthToken(this.STUB_AUTHORIZER)
        return Promise.resolve(user)
    }
}
