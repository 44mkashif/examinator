const mongoose = require('mongoose');

const connect = () => {
    // 'mongodb://localhost:27017/examinator'
    // 'mongodb+srv://saifhashmi:Emn3Ae09No8jFglb@cluster0.pj1dt.mongodb.net/Examinator?retryWrites=true&w=majority'
    const url1 = 'mongodb+srv://saifhashmi:Emn3Ae09No8jFglb@cluster0.pj1dt.mongodb.net/Examinator?retryWrites=true&w=majority';
    const url2 = 'mongodb://localhost:27017/examinator';
    mongoose.connect(url2, { useNewUrlParser: true, useUnifiedTopology: true });
    var db = mongoose.connection;
    db.on('error', err => {
        console.log(err);
    });
    db.once('open', () => {
        console.log('Database Connected Successfuly')
    })
}

module.exports = { connect };