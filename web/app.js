const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;

app.use(require('express-fileupload')())
app.use(express.static('public'))
app.post('/upload', (request, response) => {
    console.log(request.files)
    const file = request.files.videoFiles
    const fileName = './awesome-milad-photo.mp4'
    console.log(__dirname)
    file.mv(fileName, (error) => {
        if (error) {
            console.log(error)
            response.send(error)
        } else {
            response.send('successfully uploaded '+fileName)
        }
    })
})
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
