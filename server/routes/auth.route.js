var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/auth.midleware');


router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/logout', authenticateToken, authCtrl.logout);

module.exports = router;




