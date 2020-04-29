"use strict"

const UserManager = require('../UserManager.js')
const assert = require('assert')

describe('Create a new user', () => {
    it('should fail if email already in system', async () => {
        const email = 'test@test.com'
        const userManager = new UserManager()
        await assert.rejects(userManager.createUser(email),
            { name : 'EmailExistsError' }
        )
    })

    it('should fail if email not valid', async () => {
        const email1 = null
        const email2 = undefined
        const email3 = ''
        const userManager = new UserManager()
        await assert.rejects(userManager.createUser(email1),
            { name : 'InvalidEmailError' }
        )
        await assert.rejects(userManager.createUser(email2),
            { name : 'InvalidEmailError' }
        )
        await assert.rejects(userManager.createUser(email3),
            { name : 'InvalidEmailError' }
        )
    })
})
