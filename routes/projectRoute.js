const express = require('express');
const path = require('path');
const router = express.Router();
const projectControl = require('../controller/projectControl.js');
const isAuth = require('../util/is_auth');

/*
const story_array = [new StoryObj(1234, 'Story A')
                            , new StoryObj(5678, 'Story B')
                            , new StoryObj(9012, 'Story C')
                            , new StoryObj(3456, 'Story D')];

const user_array = [new UserObj(1234, 'User A')
                            , new UserObj(5678, 'User B')
                            , new UserObj(9012, 'User C')
                            , new UserObj(3456, 'User D')];                            

function StoryObj(id, name)
{
    this.id = id;
    this.name = name;
}

function UserObj(id, name)
{
    this.id = id;
    this.name = name;
}*/

//router.get('/new', projectControl.new);
router.get('/new', isAuth, projectControl.new);
//router.post('/submit', projectControl.submit);
router.post('/', isAuth, projectControl.post);
//router.get('/', projectControl.get);
router.get('/', isAuth, projectControl.get);


module.exports = router;


