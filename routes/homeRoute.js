const express = require('express');
const path = require('path');
const router = express.Router();
const homeControl = require("../controller/homeControl.js");
const isAuth = require('../util/is_auth');

//router.use('/', isAuth, homeControl.get);
router.post('/', isAuth, homeControl.post);
router.get('/', isAuth, homeControl.get);

module.exports = router;


