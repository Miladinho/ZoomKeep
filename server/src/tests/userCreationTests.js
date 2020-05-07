"use strict";

const App = require('../App.js')
const DataBaseManagerFake = require('./mocks/DatabaseManagerFake.js')
const assert = require('assert')
const { invalidInputs, badNames } = require('./inputs/invalidInputs.js')

describe('User Creation Tests', () => {
    let app = new App()
    const validEmail = 'test@test.com'
    const validPwd = 'aValidPassword'
    const validName = 'Johnny Tester'

    beforeEach(() => {
        app = new App(new DataBaseManagerFake())
    })
    
    describe('Invalid inputs check', () => {
        invalidInputs.forEach( test => {
            it(`should fail if email is ${test.name}`, async () => {
                await assert.rejects(app.createUser(test.case, validName, validName),
                    { name : 'InvalidEmailError' }
                )
            })

            it(`should fail if password is ${test.name}`, async () => {
                await assert.rejects(app.createUser(validEmail, test.case, validName),
                    { name : 'InvalidPasswordError' }
                )
            })

            it(`should fail if name is ${test.name}`, async () => {
                await assert.rejects(app.createUser(validEmail, validPwd, test.case),
                    { name : 'InvalidNameError' }
                )
            })
        })

        badNames.forEach( test => {
            it(`should fail if name input is ${test.name}`, async () => {
                await assert.rejects(app.createUser(validEmail, validPwd, test.case),
                    { name : 'InvalidNameError' }
                )
            })
        })
    })

    describe('Input format checks', () => {
        it('should fail if email already in system', async () => {
            await app.createUser(validEmail, validPwd, validName)
            await assert.rejects(app.createUser(validEmail, validPwd, validName),
                { name : 'EmailExistsError' }
            )
        })

        it('should pass/(not throw) for valid inputs', async () => {
            await assert.doesNotReject(app.createUser(validEmail, validPwd, validName))
        })

        it('should return an object with user name and email when successful', async () => {
            assert.deepEqual(await app.createUser(validEmail, validPwd, validName),
                { 
                    email: validEmail,
                    name: validName
                }
            )
        })
    })
})
