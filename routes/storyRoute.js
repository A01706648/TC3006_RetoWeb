const express = require('express');
const path = require('path');
const router = express.Router();
const storyControl = require('../controller/storyControl.js');
const isAuth = require('../util/is_auth');


router.get('/new', isAuth, storyControl.new);
router.post('/', isAuth, storyControl.post);
router.get('/', isAuth, storyControl.get);

module.exports = router;


