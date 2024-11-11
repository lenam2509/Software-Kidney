var mysql2 = require('mysql2');


const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'phan_mem_loc_than',
});

db.connect(function (err) {
    if (err) {
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000);
    }
    console.log('connected to db');
});




module.exports = db
