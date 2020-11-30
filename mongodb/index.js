var MongoClient = require('mongodb').MongoClient



var url = `mongodb://${username}:${password}@den1.mongo1.gear.host:27001/secvideos`
var database = null

module.exports = MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err
    console.log('Connected to Database')

    database = db.db('secvideos')
    // database.createCollection('videos', function(err, res) {
    //     if (err) throw err
    //     console.log('Created collection videos')
    //     db.close()
    // })
    db.close()
})