const mongoose = require('mongoose');

const connect = () => {
    const url1 = 'mongodb://localhost:27017/examinator';
    mongoose.connect(url1, { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    db.on('error', err => {
        console.log(err);
    });
    db.once('open', () => {
        console.log('Database Connected Successfuly')
    })
}

module.exports = { connect };