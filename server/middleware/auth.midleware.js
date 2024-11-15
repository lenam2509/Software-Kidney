var jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    if (token == null) return res.status(401).json({ message: 'không có token' });  // No token present

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'token không đúng' });  // Invalid token

        req.user = user;
        // console.log(req.user)
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    const sql = 'SELECT role FROM users WHERE id = ?'
    db.query(sql, [req.user.id], function (error, results) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (results[0].role !== 'admin') {
            return res.status(403).json({ message: 'không phải admin' });
        }
        next();
    })
};