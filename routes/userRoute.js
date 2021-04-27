const express = require('express');
const router = express.Router();
const userControl = require("../controller/userControl.js");
const isAuth = require('../util/is_auth');


router.get('/login', userControl.getLogin);
router.post('/login', userControl.postLogin);
router.get('/logout', isAuth, userControl.getLogout);
router.get('/new', userControl.getNew);
router.post('/new', userControl.postNew);

module.exports = router;