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
    let story_id = queryObj.id;

    let story = storyModel.getById(story_id);
    let project;
    if(story)
    {
        story = new storyModel(rows[0])
        project = projectModel.getById(story.project_id);
        if(!project)
        {
            console.log('Can not get Project');
            project = projectModel.getEmpty();
        }
        console.log(`Project Id ${project.id}, Story Id ${story.id}`);
    }
    else
    {
        console.log(`story ${story_id} not found, go to new story`);
        story = storyModel.getEmpty();
        project = projectModel.getEmpty();
    }

    console.log(story);
    response.render('story', {session:request.session,
                                csrfToken:request.csrfToken(),
                                story: story,
                                project: project,
                                task_list: taskModel.getByStory(story.id),
                                test_list: testModel.getByStory(story.id),
                                state: optionModel.work_state,
                                stakeholder: optionModel.stakeholder});
}

exports.new = (request, response, next) => {
    console.log('new story');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);

    let project_id = queryObj.id;//req.query.id;
    let story = storyModel.getEmpty();
    let project = projectModel.getById(project_id);

    if(!project)
    {
        console.log(`can not find project ${project_id}`);
        project = projectModel.getEmpty();
    }

    response.render('story', {session:request.session,
                                csrfToken:request.csrfToken(),
                                story: story,
                                project: project,
                                task_list: taskModel.getByStory(story.id),
                                test_list: testModel.getByStory(story.id),
                                state: optionModel.work_state,
                                stakeholder: optionModel.stakeholder});
}

exports.post = (request, response, next) => {
    /*update story*/
    console.log("Set Story");
    console.log(request.body);

    let story = new storyModel(request.body);
    let id = story.save();
    
    console.log(`id is ${id}`);

    response.redirect(`/story/?id=${id}`);
}