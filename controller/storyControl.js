const path = require('path');
const taskModel = require('../model/taskModel.js');
const testModel = require('../model/testModel.js');
const storyAssignModel = require('../model/storyAssignModel.js');
const storyModel = require('../model/storyModel.js');
const optionModel = require('../model/optionModel.js');
const projectModel = require('../model/projectModel.js');
const userModel = require('../model/userModel.js');
const assignModel = require('../model/storyAssignModel.js');
const url = require('url');


exports.get = async (request, response, next) => {
    console.log('get story');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);
    let story_id = queryObj.id;

    let story = await storyModel.getById(story_id);
    let project;
    let task_list = [];
    let test_list = [];
    let user_list = [];
    if(story)
    {
        project = await projectModel.getById(story.project_id);
        task_list = await taskModel.getByStory(story.id);
        test_list = await testModel.getByStory(story.id);
        user_list = await userModel.getByProject(story.project_id);
        //user_list.push({id:"null", name:'unsigned'});
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
                                task_list: task_list,
                                test_list: test_list,
                                user_list: user_list,
                                state: optionModel.work_state,
                                stakeholder: optionModel.stakeholder});
}

exports.new = async (request, response, next) => {
    console.log('new story');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);

    let project_id = queryObj.id;//req.query.id;
    let story = await storyModel.getEmpty();
    story.user_id = 'null';
    story.project_id = project_id;
    let project = await projectModel.getById(project_id);
    let user_list = await userModel.getByProject(project_id);
    //user_list.push({id:"null", name:'unsigned'});
    let task_list = [];
    let test_list = []; 

    if(!project)
    {
        console.log(`can not find project ${project_id}`);
        project = projectModel.getEmpty();
    }

    response.render('story', {session:request.session,
                                csrfToken:request.csrfToken(),
                                story: story,
                                project: project,
                                task_list: task_list,
                                test_list: test_list,
                                user_list: user_list,
                                state: optionModel.work_state,
                                stakeholder: optionModel.stakeholder});
}

exports.post = async (request, response, next) => {
    /*update story*/
    console.log("Set Story");
    console.log(request.body);

    let story = new storyModel(request.body);
    let id = await story.save();
    
    console.log(`id is ${id}`);

    response.redirect(`/story/?id=${id}`);
}