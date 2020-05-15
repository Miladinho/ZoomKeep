// https://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-an-email-address
module.exports.goodEmails = [
    {
        case: 'IamAGoodEmail@test.com',
        name: 'single username and domain name string'
    },
    {
        case: 'I.Am.A.Good.Email@test.com',
        name: 'Multiple dots in username'
    },
    {
        case: 'test@subdomain.test.com',
        name: 'subdomain email'
    }
]

module.exports.validEmail = 'test@test.com'
module.exports.validPwd = 'aValidPassword'
module.exports.validName = 'Johnny Tester'
module.exports.role = 'Tutor'