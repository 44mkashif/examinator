const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./config/database');

const api = require('./routes/api');  
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

app.listen(4000, () => {
    database.connect();
    console.log('Examinator Server Started at PORT 4000...');
})