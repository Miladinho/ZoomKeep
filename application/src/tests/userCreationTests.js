"use strict";

const App = require('../App')
const assert = require('assert')
const {
    UserManagerSpy,
    UserManagerFake
} = require('./UserManagerTestDoubles')
const { badNames, invalidInputs } = require('./inputs/invalidInputs')
const { malformedEmails, maliciousInputs } = require('./inputs/badInputs')

describe('User Creation Tests', () => {
    let app = new App()
    const validEmail = 'test@test.com'
    const validPwd = 'aValidPassword'
    const validName = 'Johnny Tester'
    const role = 'Tutor'

    describe('Invalid inputs check', () => {
        beforeEach(() => {
            app.setUserManager(new UserManagerSpy())
        })

        invalidInputs.forEach( test => {
            it(`should fail if email is ${test.name}`, async () => {
                assert.rejects(app.createUser(test.case, validName, validName, role),
                    { name : 'InvalidEmailError' }
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })

            it(`should fail if password is ${test.name}`, async () => {
                await assert.rejects(app.createUser(validEmail, test.case, validName, role),
                    { name : 'InvalidPasswordError' }
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })

            it(`should fail if name is ${test.name}`, async () => {
                await assert.rejects(app.createUser(validEmail, validPwd, test.case, role),
                    { name : 'InvalidNameError' }
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })
        })

        badNames.forEach( test => {
            it(`should fail if name input is ${test.name}`, async () => {
                assert.rejects(app.createUser(validEmail, validPwd, test.case, role),
                    { name : 'InvalidNameError' }
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })
        })
    })

    describe('Bad inputs check', () => {
        beforeEach(() => app.setUserManager(new UserManagerSpy()))

        malformedEmails.forEach( test => {
            it(`should thow when email input is ${test.name}`, async () => {
                assert.rejects(app.createUser(test.case, validPwd, validName, role),
                    { name: 'InvalidEmailError'}
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })
        })

        maliciousInputs.forEach( test => {
            it(`should thow when email input is ${test.name}`, async () => {
                assert.rejects(app.createUser(test.case, validPwd, validName, role),
                    { name: 'InvalidEmailError'}
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })
        })
    })

    describe('Basic authentication', () => {
        beforeEach(() => app.setUserManager(new UserManagerFake()))
        it('should fail if email already in system', async () => {
            await app.createUser(validEmail, validPwd, validName)
            await assert.rejects(app.createUser(validEmail, validPwd, validName, role),
                { name : 'EmailExistsError' }
            )
        })

        it('should pass/(not throw) for valid inputs', async () => {
            await assert.doesNotReject(app.createUser(validEmail, validPwd, validName, role))
        })

        it('should return an object with user name, email, and role when successful', async () => {
            assert.deepEqual(await app.createUser(validEmail, validPwd, validName, role),
                { 
                    email: validEmail,
                    name: validName,
                    role: role
                }
            )
        })
    })
})
