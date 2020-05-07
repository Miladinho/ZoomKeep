"use strict";

const App = require('../App.js')
const DataBaseManagerFake = require('./mocks/DatabaseManagerFake.js')
const assert = require('assert')

describe('Create a new user', () => {
    let app = new App()
    const validEmail = 'test@test.com'
    const validPwd = 'aValidPassword'
    const validName = 'Johnny Tester'

    beforeEach(() => {
        app = new App(new DataBaseManagerFake())
    })

    const invalids = [
        { case: null, name: 'null' },
        { case: undefined, name: 'undefined' },
        { case: '', name: 'empty string' }
    ]
    invalids.forEach( test => {
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

    const badNames = [
        { case: 'milad', name: 'single name with all lower case' },
        { case: 'Milad', name: 'single name and first character is upper case' },
        { case: 'MILAD', name: 'single name with all upper case' },
        { case: 'mIlAd', name: 'single name with mixed cases' }
    ].forEach( test => {
        it(`should fail if name input is ${test.name}`, async () => {
            await assert.rejects(app.createUser(validEmail, validPwd, test.case),
                { name : 'InvalidNameError' }
            )
        })
    })

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
