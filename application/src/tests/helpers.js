'use strict;'

const { invalidInputs } = require('./inputs/invalidInputs.js')
const { malformedEmails, maliciousInputs} = require('./inputs/badInputs.js')

module.exports.invalidInputsTests = (testFunction) => {
    describe('Invalid inputs check', async () => {
        invalidInputs.forEach( test => {
            it(`should reject if email input is ${test.name}`, async () => {
                assert.rejects(app.login(test.case, password, role),
                    { name: 'InvalidCredentialsError'}
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })
        })

        invalidInputs.forEach( test => {
            it(`should reject if password is ${test.name}`, async () => {
                assert.rejects(app.login(test.case, password, role),
                    { name: 'InvalidCredentialsError'}
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })
        })

        malformedEmails.forEach( test => {
            it(`should reject if email is ${test.name}`, async () => {
                assert.rejects(app.login(test.case, password, role),
                    { name: 'InvalidCredentialsError'}
                )
                assert.equal(app.userManager.invokedCreateUser, false)
            })
        })
    })
}

