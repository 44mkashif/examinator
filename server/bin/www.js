const app = require('./../server');
const database = require('./../app/config/database');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    database.connect();
    console.log(`Server is running at PORT ${PORT}`);
});