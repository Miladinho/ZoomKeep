'use strict';

const App = require('../App')
const assert = require('assert')
const { maliciousInputs} = require('./inputs/badInputs')
const {
    AuthorizerSpy,
    RejectingAuthorizerStub
} = require('./AuthorizerTestDoubles')

describe('Login Tests', () => {
    const app = new App()
    const email = 'test@test.com'
    const password = 'aPassWord'
    const name = 'Test Name'
    const role = 'Tutor'

    describe('Input security checks', () => {
        beforeEach(() => app.setAuthorizer(new AuthorizerSpy()))

        maliciousInputs.forEach( test => {
            it(`should reject if email is ${test.name} before invoking authorizer`, async () => {
                assert.rejects(app.login(test.case, password),
                    { name: 'InvalidCredentialsError'}
                )
                assert.equal(app.authorizer.invokedLogin, false)
            })
        })
    })

    describe('Authenticate a user', () => {
        beforeEach(() => app.setAuthorizer(new RejectingAuthorizerStub()))
        it('should reject if user does not exist', async () => {
            assert.rejects(app.login(email, password),
                { name: 'InvalidCredentialsError'}
            )
            assert.equal(app.authorizer.invokedLogin, true)
        })

        // it('should reject if password does not match', async () => {
        //     assert.rejects(app.login(email, 'badPassword'),
        //         { name: 'InvalidCredentialsError'}
        //     )
        //     assert.equal(app.authorizer.invokedLogin, true)
        // })

        // it('should pass/(not throw) for valid user credentials', async () => {
        //     await app.createUser(email, password, name)
        //     assert.doesNotReject(app.login(email, password))
        // })

        //it('should')
    })
})
