var mysql2 = require('mysql2');


const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'phan_mem_loc_than',
});

db.connect(function (err) {
    if (err) {
        return console.log('error when connecting to db:', err);
    }
    console.log('connected to db');
});




module.exports = db
