"use strict";

const UserManager = require('../UserManager.js')
const DataBaseManagerMock = require('./mocks/DatabaseManagerMock.js')
const assert = require('assert')

describe('Create a new user', () => {
    const userManager = new UserManager()
    const validEmail = 'test@test.com'
    const validPwd = 'aValidPassword'
    const validName = 'Johnny Tester'

    beforeEach(() => {
        userManager.setDBManager(new DataBaseManagerMock())
    })

    const invalids = [
        { case: null, name: 'null' },
        { case: undefined, name: 'undefined' },
        { case: '', name: 'empty string' }
    ]
    invalids.forEach( test => {
        it(`should fail if email ${test.name}`, async () => {
            await assert.rejects(userManager.createUser(test.case, validName, validName),
                { name : 'InvalidEmailError' }
            )
        })

        it(`should fail if password is ${test.name}`, async () => {
            await assert.rejects(userManager.createUser(validEmail, test.case, validName),
                { name : 'InvalidPasswordError' }
            )
        })

        it(`should fail if name is ${test.name}`, async () => {
            await assert.rejects(userManager.createUser(validEmail, validPwd, test.case),
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
            await assert.rejects(userManager.createUser(validEmail, validPwd, test.case),
                { name : 'InvalidNameError' }
            )
        })
    })
    const validNames = [
        { input: 'jonny tester', output: 'Jonny Tester' },
        { input: 'jonny tester long name', output: 'Jonny Tester Long Name' },
        { input: 'jonny i. s. fancy', output: 'Jonny I. S. Fancy' }
    ].forEach( test => {
        it(`should capitalize the first characters of name '${test.input}'`, async () => {
            const result = await userManager.createUser(validEmail, validPwd, test.input)
            assert.strictEqual(result.name, test.output)
        })
    })

    it('should fail if email already in system', async () => {
        userManager.createUser(validEmail, validPwd, validName)
        await assert.rejects(userManager.createUser(validEmail, validPwd, validName),
            { name : 'EmailExistsError' }
        )
    })

    it('should pass/(not throw) for valid inputs', async () => {
        await assert.doesNotReject(userManager.createUser(validEmail, validPwd, validName))
    })
})
