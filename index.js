const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use(fileUpload({
    createParentPath: true
}))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


app.post('/upload-video', async (req, res) => {
    console.log('this is the requestbody' + req.body.name) // works
    try {
        if (!req.body.name) {
            res.send({
                message: 'No file has been uploaded'
            })
        } else {
            // give unique filename later
            let video = req.body.files.blob

            video.mv('./uploadedfiles/' + video.name)
            console.log('Uploaded video: ' + video.name)

            res.send({
                message: 'File successfully uploaded'
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
)