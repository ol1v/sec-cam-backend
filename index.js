const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})