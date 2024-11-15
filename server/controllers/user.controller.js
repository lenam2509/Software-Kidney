const db = require('../config/db')

exports.getAllUsers = async function (req, res) {
    try {
        const sql = 'SELECT id, email, role FROM users'
        db.query(sql, function (error, results) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            return res.status(200).json(results);
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.deleteUser = async function (req, res) {
    try {
        const sql = 'DELETE FROM users WHERE id = ?'
        db.query(sql, [req.params.id], function (error, results) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            return res.status(200).json({ message: 'xóa thành công user id ' + req.params.id });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}