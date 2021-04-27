const path = require('path');
const taskModel = require('../model/taskModel.js');
const testModel = require('../model/testModel.js');
const storyAssignModel = require('../model/storyAssignModel.js');
const storyModel = require('../model/storyModel.js');
const optionModel = require('../model/optionModel.js');
const projectModel = require('../model/projectModel.js');
const url = require('url');


exports.get = (request, response, next) => {
    console.log('get story');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);

    let story = storyModel.getCopyById(queryObj.id);
    let project;

    if(!story)
    {
        console.log("No Story");
        story = storyModel.getEmpty();
        project = projectModel.getEmpty();
    }
    else
    {
        console.log("Story Found");
        console.log("Project Id");
        console.log(story.project_id);
        project = projectModel.getCopyById(story.project_id);
    }
    response.render('story', {session:request.session,
                                csrfToken:request.csrfToken(),
                                story: story,
                                project: project,
                                task_list: taskModel.getByStory(story.id),
                                test_list: testModel.getByStory(story.id),
                                state: optionModel.getWorkState(),
                                stakeholder: optionModel.getStakeholder()});
}

exports.new = (request, response, next) => {
    console.log('new story');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);

    let project_id = queryObj.id;//req.query.id;
    let story = storyModel.getEmpty();
    let project = projectModel.getCopyById(project_id);

    response.render('story', {session:request.session,
                                csrfToken:request.csrfToken(),
                                story: story,
                                project: project,
                                task_list: taskModel.getByStory(story.id),
                                test_list: testModel.getByStory(story.id),
                                state: optionModel.getWorkState(),
                                stakeholder: optionModel.getStakeholder()});
}

exports.submit = (request, response, next) => {
    /*update story*/
    console.log("Set Story");
    console.log(request.body);

    let id = request.body.id;
    if(request.body.id == 0)
    {/*New Story*/
        id = storyModel.getList().length + 1;
        console.log('new');
        storyModel.create(id
                            , request.body.project_id
                            , request.body.name
                            , request.body.description
                            , request.body.purpose
                            , request.body.comment
                            , request.body.stakeholder
                            , request.body.ap
                            , request.body.state);
    }
    else
    {/*Modify Project*/
        projectModel.modify(id
                            , request.body.name
                            , request.body.project_id
                            , request.body.description
                            , request.body.purpose
                            , request.body.comment
                            , request.body.stakeholder
                            , request.body.ap
                            , request.body.state);
    }

    console.log(`id is ${id}`);

    response.redirect(`/story/?id=${id}`);
}