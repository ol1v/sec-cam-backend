const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')
const uuid = require('uuid')
const fs = require('fs')
const path = require('path')
const db = require('./mongodb')

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
            console.log('typeof video:' + req.files.files.mimetype)
            video.mv('./uploadedfiles/' + 'video')

            fs.rename('./uploadedfiles/video', 'uploadedfiles/' + token, () => {
                console.log('Changed filename')
            })

            // var dbcollection = { // add description later
            //     name: req.body.name,
            //     path: `./uploadedfiles/${token}`
            // }

            // db.collection('videos').insertOne(dbcollection, function(err, res) {
            //     if (err) throw err
            //     console.log('saved videopath to database')
            //     db.close()
            // })

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
    let arr = []
    const directoryPath = path.join(__dirname, 'uploadedfiles')

    fs.readdir(directoryPath, function (err, files) {
        if(err) {
            return console.log('Unable to read directory:' + err)
        }
        
        files.forEach(function(file) {
            console.log('file' + file)
            // fs.readFile()
            arr.push(file)
        })
        res.status(200).send({message: 'Get request works',
                            data: arr})
    })
})

// Create post to specific file and send back thumbnail + file.name
app.get ('/videos/:file', (req, res) => {
    // let readStream = fs.createReadStream(__dirname + '/uploadedfiles/4fd15965-5ef1-4d53-b7c7-f195cf63d2d0')
    console.log('params:: ' + req.params.file)
    let readStream = fs.createReadStream(__dirname + `/uploadedfiles/${req.params.file}`)

    // When the stream is done being read, end the response
    readStream.on('close', () => {
        res.end()
    })

    // Stream chunks to response
    readStream.pipe(res)    
});
