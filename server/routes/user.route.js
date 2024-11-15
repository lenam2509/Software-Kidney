var express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/user.controller');
const { authenticateToken, isAdmin } = require('../middleware/auth.midleware');
var router = express.Router();


router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', authenticateToken, isAdmin, deleteUser);

module.exports = router;