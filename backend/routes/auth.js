const express = require('express');
const router = express.Router();
const { handleUserRegister, handleUserLogin, handleUserLogout } = require('../controllers/auth');

router.post('/register', handleUserRegister);
router.post('/login', handleUserLogin)
router.post('/logout', handleUserLogout);

module.exports = router;
