module.exports.invalidInputs = [
    { case: null, name: 'null' },
    { case: undefined, name: 'undefined' },
    { case: '', name: 'empty string' }
]

module.exports.badNames = [
    { case: 'milad', name: 'single name with all lower case' },
    { case: 'Milad', name: 'single name and first character is upper case' },
    { case: 'MILAD', name: 'single name with all upper case' },
    { case: 'mIlAd', name: 'single name with mixed cases' }
]
