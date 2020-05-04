"use strict";

const App = require('../App.js')
const DataBaseManagerMock = require('./mocks/DatabaseManagerMock.js')
const assert = require('assert')

describe('Create a new user', () => {
    let app = new App()
    const validEmail = 'test@test.com'
    const validPwd = 'aValidPassword'
    const validName = 'Johnny Tester'

    beforeEach(() => {
        app = new App(new DataBaseManagerMock())
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
    const validNames = [
        { input: 'jonny tester', expectedOutput: 'Jonny Tester' },
        { input: 'jonny tester long name', expectedOutput: 'Jonny Tester Long Name' },
        { input: 'jonny i. s. fancy', expectedOutput: 'Jonny I. S. Fancy' }
    ].forEach( test => {
        it(`should capitalize the first characters of name '${test.input}'`, async () => {
            const result = await app.createUser(validEmail, validPwd, test.input)
            assert.strictEqual(result.name, test.expectedOutput)
        })
    })

    it('should fail if email already in system', async () => {
        app.createUser(validEmail, validPwd, validName)
        await assert.rejects(app.createUser(validEmail, validPwd, validName),
            { name : 'EmailExistsError' }
        )
    })

    it('should pass/(not throw) for valid inputs', async () => {
        await assert.doesNotReject(app.createUser(validEmail, validPwd, validName))
    })
})
