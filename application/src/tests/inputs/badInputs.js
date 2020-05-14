/*
    Reference this article for email address construction rules:
    https://stackoverflow.com/questions/2049502/what-characters-are-allowed-in-an-email-address
*/
module.exports.malformedEmails = [
    {
        case: 'abadEmail.com',
        name: 'abadEmail.com'
    },
    // { 
    //     case: 'a@b.nonexistentdomain',
    //     name: 'bogus domain name'
    // },
    {
        case: '@stuff.com', 
        name: 'no local name'
    },
    {
        case: 'user@[IPv6:2001:db8::1]',
        name: 'domain name IP injection'
    },
    {
        case: '.ehh@example.org',
        name: 'dot in begining of username'
    },
    {
        case: 'eden..ehh@example.org',
        name: 'consecutive dots in username'
    },
    {
        case: 'a regular string that is meaningless',
        name: 'a regular string'
    }
]

module.exports.maliciousInputs = [
    {
        case: `SELECT * FROM members WHERE username = 'admin'--' AND password = 'password';`,
        name: `SQL injection: SELECT * FROM members WHERE username = 'admin'--' AND password = 'password';`
    },
    {
        case: '"><script>alert(1);</script>"@example.org',
        name: 'XSS injection string'
    },
    {
        case: '1;DROP TABLE users',
        name: 'SQL injection: 1;DROP TABLE users'
    },
    {
        case: `1'; DROP TABLE users-- 1`,
        name: `SQL injection: 1'; DROP TABLE users-- 1`
    },
    {
        case: `' OR 1=1 -- 1`,
        name: `SQL injection: ' OR 1=1 -- 1`
    },
    {
        case: `' OR '1'='1`,
        name: `SQL injection: ' OR '1'='1`
    }
]
