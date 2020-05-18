'use strict';

const App = require('../App')
const assert = require('assert')
const { maliciousInputs} = require('./inputs/badInputs')
const {
    UserManagerSpy,
    RejectingUserManagerSpy,
    AcceptingUserManagerSpy
} = require('./testDoubles/UserManagerTestDoubles')
const { AcceptingAuthorizerStub } = require('./testDoubles/AuthorizerTestDoubles')
const {
    validEmail,
    validPwd,
    validName,
    role
} = require('./inputs/goodInputs')

describe('Login Tests', () => {
    const app = new App()

    describe('Input security checks', () => {
        maliciousInputs.forEach( test => {
            it(`should reject if email is ${test.name}`, async () => {
                const userManagerSpy = new UserManagerSpy()
                app.setUserManager(userManagerSpy)
                assert.rejects(app.login(test.case, validPwd),
                    { name: 'InvalidCredentialsError'}
                )
                assert.equal(userManagerSpy.invokationsCount(), 0)
            })
        })
    })

    describe('Authenticate a user', () => {
        context('Invalid login', () => {
            it('should reject if user does not exist', async () => {
                const rejectingUserManagerSpy = new RejectingUserManagerSpy()
                app.setUserManager(rejectingUserManagerSpy)
                assert.rejects(app.login(validEmail, validPwd),
                    { name: 'EmailDoesNotExistError'}
                )
                assert.equal(rejectingUserManagerSpy.invokedGetUser, true)
            })

            it('should reject if password does not match', async () => {
                const acceptingUserManagerSpy= new AcceptingUserManagerSpy()
                app.setUserManager(acceptingUserManagerSpy)
                assert.rejects(app.login(validEmail, 'badPassword'),
                    { name: 'InvalidCredentialsError'}
                )
                assert.equal(acceptingUserManagerSpy.invokedGetUser, true)
            })
        })
        context('Valid login', () => {
            it('should pass/(not throw) for valid user credentials', async () => {
                const acceptingUserManagerSpy= new AcceptingUserManagerSpy()
                const acceptingAuthorizerStub = new AcceptingAuthorizerStub()
                app.setUserManager(acceptingUserManagerSpy)
                app.setAuthorizer(acceptingAuthorizerStub)
                assert.doesNotReject(app.login(validEmail, validPwd))
                assert.equal(acceptingUserManagerSpy.invokedGetUser, true)
            })

            it('should return an object with username, email, role, and authToken when successful', async () => {
                const acceptingUserManagerSpy = new AcceptingUserManagerSpy()
                const acceptingAuthorizerStub = new AcceptingAuthorizerStub()
                app.setUserManager(acceptingUserManagerSpy)
                app.setAuthorizer(acceptingAuthorizerStub)

                assert.deepEqual(await app.login(validEmail, validPwd, validName, role),
                    { 
                        authToken: acceptingAuthorizerStub.STUB_AUTHORIZER
                    }
                )
                assert.equal(acceptingUserManagerSpy.invokedGetUser, true)
            })
        })
    })
})
