const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/examinator', {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;
    db.on('error', err => {
        console.log(err);
    });
    db.once('open', () => {
        console.log('Database Connected Successfuly')
    }) 
}

module.exports = { connect };