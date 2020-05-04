
module.exports = class User {
    constructor(email, password, name) {
        var email = email
        var name = name

        this.getName = () => {
            return name
        }

        this.getEmail = () => {
            return email
        }
    }
}
