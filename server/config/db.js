var mysql2 = require('mysql2');


const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'phan_mem_than',
});

db.connect(function (err) {
    if (err) {
        return console.log('error when connecting to db:', err);
    }
    console.log('connected to db');
});




module.exports = db
