'use strict';

module.exports = class DataBaseManagerFake {
    constructor(data) {
        this.data = data || new Map()
    }

    getUser(email) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.data.has(email)) 
                    resolve(this.data.get(email))
                else 
                    reject(new Error())
            }, 100)
        })
    }

    createUser(user) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.data.has(user.getEmail()))
                    reject(new Error())
                this.data.set(user.getEmail(), user)
                resolve(user)
            }, 100)
        })
    }
}
