"use strict";

const App = require('../App')
const assert = require('assert')
const {
    UserManagerSpy,
    RejectingUserManagerSpy,
    AcceptingUserManagerSpy
} = require('./UserManagerTestDoubles')
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
    const app = new App(userManagerSpy)

    describe('Invalid inputs check', () => {
        beforeEach(() => userManagerSpy = new UserManagerSpy())

        invalidInputs.forEach( test => {
            it(`should fail if email is ${test.name}`, async () => {
                assert.rejects(app.addUser(test.case, validName, validName, role),
                    { name : 'InvalidEmailError' }
                )
                assert.equal(userManagerSpy.invokedCreateUser, false)
            })

            it(`should fail if password is ${test.name}`, async () => {
                await assert.rejects(app.addUser(validEmail, test.case, validName, role),
                    { name : 'InvalidPasswordError' }
                )
                assert.equal(userManagerSpy.invokedCreateUser, false)
            })

            it(`should fail if name is ${test.name}`, async () => {
                await assert.rejects(app.addUser(validEmail, validPwd, test.case, role),
                    { name : 'InvalidNameError' }
                )
                assert.equal(userManagerSpy.invokedCreateUser, false)
            })
        })

        badNames.forEach( test => {
            it(`should fail if name input is ${test.name}`, async () => {
                assert.rejects(app.addUser(validEmail, validPwd, test.case, role),
                    { name : 'InvalidNameError' }
                )
                assert.equal(userManagerSpy.invokedCreateUser, false)
            })
        })
    })

    describe('Bad inputs check', () => {
        beforeEach(() => userManagerSpy = new UserManagerSpy())

        malformedEmails.forEach( test => {
            it(`should thow when email input is ${test.name}`, async () => {
                assert.rejects(app.addUser(test.case, validPwd, validName, role),
                    { name: 'InvalidEmailError'}
                )
                assert.equal(userManagerSpy.invokedCreateUser, false)
            })
        })

        maliciousInputs.forEach( test => {
            it(`should thow when email input is ${test.name}`, async () => {
                assert.rejects(app.addUser(test.case, validPwd, validName, role),
                    { name: 'InvalidEmailError'}
                )
                assert.equal(userManagerSpy.invokedCreateUser, false)
            })
        })
    })

    describe('Basic user creation', () => {
        it('should fail if email already in system', async () => {
            const rejectingUserManagerSpy = new RejectingUserManagerSpy()
            app.setUserManager(rejectingUserManagerSpy)
            assert.rejects(app.addUser(validEmail, validPwd, validName, role),
                { name : 'EmailExistsError' }
            )
            assert.equal(rejectingUserManagerSpy.invokedGetUser, true)
        })

        it('should pass/(not throw) for valid inputs', async () => {
            const acceptingUserManagerSpy = new AcceptingUserManagerSpy()
            app.setUserManager(acceptingUserManagerSpy)
            assert.doesNotReject(app.addUser(validEmail, validPwd, validName, role))
            assert.equal(acceptingUserManagerSpy.invokedGetUser, true)
        })

        it('should return an object with username, email, and role when successful', async () => {
            const acceptingUserManagerSpy = new AcceptingUserManagerSpy()
            app.setUserManager(acceptingUserManagerSpy)
            assert.deepEqual(await app.addUser(validEmail, validPwd, validName, role),
                { 
                    email: validEmail,
                    name: validName,
                    role: role
                }
            )
            assert.equal(acceptingUserManagerSpy.invokedGetUser, true)
        })
    })
})
