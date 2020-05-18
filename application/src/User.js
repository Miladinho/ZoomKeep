
module.exports = class User {
    constructor(email, password, name, role) {
        var email = email
        var name = name
        var password = password
        var role = role
        var authToken = null

        this.getName = () => name
        this.getEmail = () => email
        this.getPassword = () => password
        this.getAuthToken = () => authToken
        this.setAuthToken = (token) => authToken = token
        this.serializeToJSON = () => {
            return { email: email, name: name, role: role }
        }
    }
}
