const express = require('express')
const app = express()
const PORT = process.env.PORT || 8282;

const UserManager = require('./UserManager.js')

app.post('/createUser', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let passwordHash = req.body.passwordHash


})
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))