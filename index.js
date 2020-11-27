const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const fs = require('fs')

const app = express()


app.use(fileUpload({
    createParentPath: true
}))

// set limit of filesize
const SIZE_LIMIT = '1gb'

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: SIZE_LIMIT }));

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


app.post('/upload-video', async (req, res) => {
    console.log('this is the requestbody' + req.files) // works
    try {
        if (!req.body.name) {
            res.send({
                message: 'No file has been uploaded'
            })
        } else {
            // use token to add unique filename
            let token = uuid.v4()

            let video = req.files.files // this is the blob

            video.mv('./uploadedfiles/' + 'video')

            fs.rename('./uploadedfiles/video', 'uploadedfiles/' + token, () => {
                console.log('Changed filename')
            })

            // TODO: Save path to file in database

            res.send({
                message: 'File successfully uploaded'
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
)

app.get('/saved-videos', function (req, res) {

})