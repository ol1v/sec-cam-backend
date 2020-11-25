const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')

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
            // give unique filename later
            let video = req.files

            console.log('req.files reaches server')

            // video.mv('./uploadedfiles/' + 'video')
            // console.log('Uploaded video: ' + 'video')

            res.send({
                message: 'File successfully uploaded'
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
)