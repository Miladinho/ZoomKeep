
module.exports = class User {
    constructor(email, password, name, role) {
        var email = email
        var name = name
        var password = password
        var role = role
        
        this.getName = () => name
        this.getEmail = () => email
        this.getPassword = () => password
        this.serializeToJSON = () => {
            return { email: email, name: name, role: role }
        }
    }
}
