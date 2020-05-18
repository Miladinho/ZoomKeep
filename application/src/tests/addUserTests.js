"use strict";

const App = require('../App')
const assert = require('assert')
const {
    UserManagerSpy,
    RejectingUserManagerSpy,
    AcceptingUserManagerSpy
} = require('./testDoubles/UserManagerTestDoubles')
const {
    RejectingAuthorizerSpy,
    AcceptingAuthorizerSpy
} = require('./testDoubles/AuthorizerTestDoubles')
const {
    validEmail,
    validPwd,
    validName,
    role
} = require('./inputs/goodInputs')
const { badNames, invalidInputs } = require('./inputs/invalidInputs')
const { malformedEmails, maliciousInputs } = require('./inputs/badInputs')

describe('User Creation Tests', () => {
    let userManagerSpy = new UserManagerSpy()
    let authorizerSpy = new AcceptingAuthorizerSpy()
    const app = new App(userManagerSpy, authorizerSpy)
    const dummyAuthToken = {}

    beforeEach(() => {
        userManagerSpy = new UserManagerSpy()
        authorizerSpy = new AcceptingAuthorizerSpy()
        app.setAuthorizer(authorizerSpy)
        app.setUserManager(userManagerSpy)
    })

    describe('Invalid inputs check', () => {
        invalidInputs.forEach( test => {
            it(`should fail if email is ${test.name}`, async () => {
                assert.rejects(app.addUser(test.case, validName, validName, role, dummyAuthToken),
                    { name : 'InvalidEmailError' }
                )
                assert.equal(userManagerSpy.invokationsCount(), 0)
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)
            })

            it(`should fail if password is ${test.name}`, async () => {
                await assert.rejects(app.addUser(validEmail, test.case, validName, role, dummyAuthToken),
                    { name : 'InvalidPasswordError' }
                )
                assert.equal(userManagerSpy.invokationsCount(), 0)
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)
            })

            it(`should fail if name is ${test.name}`, async () => {
                await assert.rejects(app.addUser(validEmail, validPwd, test.case, role, dummyAuthToken),
                    { name : 'InvalidNameError' }
                )
                assert.equal(userManagerSpy.invokationsCount(), 0)
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)
            })
        })

        badNames.forEach( test => {
            it(`should fail if name input is ${test.name}`, async () => {
                assert.rejects(app.addUser(validEmail, validPwd, test.case, role, dummyAuthToken),
                    { name : 'InvalidNameError' }
                )
                assert.equal(userManagerSpy.invokationsCount(), 0)
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)
            })
        })
    })

    describe('Bad inputs check', () => {
        malformedEmails.forEach( test => {
            it(`should thow when email input is ${test.name}`, async () => {
                assert.rejects(app.addUser(test.case, validPwd, validName, role, dummyAuthToken),
                    { name: 'InvalidEmailError'}
                )
                assert.equal(userManagerSpy.invokationsCount(), 0)
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)            })
        })
        context('Security vulnerabilities', () => {
            maliciousInputs.forEach( test => {
                it(`should thow when email input is ${test.name}`, async () => {
                    await assert.rejects(app.addUser(test.case, validPwd, validName, role, dummyAuthToken),
                        { name: 'InvalidEmailError'}
                    )
                    assert.equal(userManagerSpy.invokationsCount(), 0)
                    assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)            })
            })
        })
    })

    describe('Basic user creation', () => {
        context('failure cases', () => {
            it('should reject if authToken is invalid', async () => {
                authorizerSpy = new RejectingAuthorizerSpy()
                app.setAuthorizer(authorizerSpy)
                const authToken = { email: 'admin@app.com' }

                await assert.rejects(app.addUser(validEmail, validPwd, validName, role, authToken),
                    { name: 'UnauthorizedAccessError' }
                )
                assert.equal(userManagerSpy.invokationsCount(), 0)
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)
            }) 

            it('should fail if email already in system', async () => {
                userManagerSpy = new RejectingUserManagerSpy()
                app.setUserManager(userManagerSpy)
                await assert.rejects(app.addUser(validEmail, validPwd, validName, role, dummyAuthToken),
                    { name : 'EmailExistsError' }
                )
                assert.equal(userManagerSpy.invokedGetUser, true)
                assert.equal(userManagerSpy.invokedCreateUser, false)
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)
            })
        })
        context('success cases', () => {
            it('should pass/(not throw) for valid inputs', async () => {
                userManagerSpy = new AcceptingUserManagerSpy()
                app.setUserManager(userManagerSpy)

                await assert.doesNotReject(app.addUser(validEmail, validPwd, validName, role, dummyAuthToken))
                assert.equal(userManagerSpy.invokationsCount() === 0, false)
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)
            })

            it('should return an object with username, email, and role when successful', async () => {
                userManagerSpy = new AcceptingUserManagerSpy()
                app.setUserManager(userManagerSpy)
                assert.deepEqual(await app.addUser(validEmail, validPwd, validName, role, dummyAuthToken),
                    { 
                        email: validEmail,
                        name: validName,
                        role: role
                    }
                )
                assert.equal(authorizerSpy.didInvokeMethod('isAuthorized'), true)
            })
        })
    })
})
