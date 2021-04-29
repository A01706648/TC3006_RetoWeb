const express = require('express');
const path = require('path');
const router = express.Router();
const taskControl = require('../controller/taskControl.js');
const isAuth = require('../util/is_auth');

router.get('/new', isAuth, taskControl.new);
router.post('/', isAuth, taskControl.post);
router.get('/', isAuth, taskControl.get);

module.exports = router;