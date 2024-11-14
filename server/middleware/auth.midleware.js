var jwt = require('jsonwebtoken')

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