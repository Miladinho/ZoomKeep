'use strict';

const App = require('../App')
const assert = require('assert')
const { maliciousInputs} = require('./inputs/badInputs')
const {
    UserManagerSpy,
    RejectingUserManagerSpy
} = require('./UserManagerTestDoubles')
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
                assert.equal(userManagerSpy.invokedGetUser, false)
            })
        })
    })

    describe('Authenticate a user', () => {
        it('should reject if user does not exist', async () => {
            const rejectingUserManagerSpy = new RejectingUserManagerSpy()
            app.setUserManager(rejectingUserManagerSpy)
            assert.rejects(app.login(validEmail, validPwd),
                { name: 'InvalidCredentialsError'}
            )
            assert.equal(rejectingUserManagerSpy.invokedGetUser, true)
        })

        // it('should reject if password does not match', async () => {
        //     assert.rejects(app.login(validEmail, 'badPassword'),
        //         { name: 'InvalidCredentialsError'}
        //     )
        //     assert.equal(app.authorizer.invokedLogin, true)
        // })

        // it('should pass/(not throw) for valid user credentials', async () => {
        //     await app.createUser(validEmail, validPwd, validName)
        //     assert.doesNotReject(app.login(validEmail, validPwd))
        // })

        //it('should')
    })
})

