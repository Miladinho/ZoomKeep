module.exports.isValidName = (name) => {
    return name && name.split(' ').length >= 2
}

module.exports.normalizeName = (nameStr) => {
    return nameStr
        .split(' ')
        .map( name => {
            return name
                .split('')
                .map( (char, i) => i == 0? char.toUpperCase() : char)
                .join('')
        })
        .join(' ')
}

module.exports.hasQuotedString = (email) => {
    return email.length > 0 ? email.charAt(0) == '"' : false
}
