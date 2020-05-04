'use strict';

module.exports = class DataBaseManagerMock {
    constructor(data) {
        this.data = data || new Map()
    }

    createUser(obj) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.data.has(obj.email))
                    reject()
                this.data.set(obj.email, obj)
                resolve()
            }, 300)
        })
    }
}
