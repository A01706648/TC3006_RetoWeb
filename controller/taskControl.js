const path = require('path');
const taskModel = require('../model/taskModel.js');
const testModel = require('../model/testModel.js');
const storyAssignModel = require('../model/storyAssignModel.js');
const storyModel = require('../model/storyModel.js');
const optionModel = require('../model/optionModel.js');
const projectModel = require('../model/projectModel.js');
const userModel = require('../model/userModel.js');
const url = require('url');

exports.get = async (request, response, next) => {
    console.log('get task');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);
    let task_id = queryObj.id;

    let task = await taskModel.getById(task_id);
    let story;
    let project;
    let user_list = [];
    if(task)
    {
        story = await storyModel.getById(task.story_id);
        
        
        //user_list.push({id:"null", name:'unsigned'});
        if(!story)
        {
            console.log('Can not get story');
            story = storyModel.getEmpty();
            project = projectModel.getEmpty();
        }
        else
        {
            project = await projectModel.getById(story.project_id);
        }

        if(!project)
        {
            console.log('Can not get project');
            project = projectModel.getEmpty();            
        }

        console.log(`Project Id ${project.id}, Story Id ${story.id}, Task Id ${task.id}`);
    }
    else
    {
        console.log(`task ${task_id} not found, go to new story`);
        task = taskModel.getEmpty();
        story = storyModel.getEmpty();
        project = projectModel.getEmpty();
    }

    if(project)
    {
        user_list = await userModel.getByProject(project.id);
    }
    else
    {
        user_list = await userModel.getAll();
    }

    console.log(task);
    response.render('task', {session:request.session,
                                csrfToken:request.csrfToken(),
                                task: task,
                                story: story,
                                project: project,
                                user_list: user_list,
                                state: optionModel.work_state,
                                stakeholder: optionModel.stakeholder,
                                type: optionModel.task_type});
}

exports.new = async (request, response, next) => {
    console.log('new task');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);

    let story_id = queryObj.id;
    let task = await taskModel.getEmpty();
    task.user_id = 'null';
    task.story_id = story_id;
    let story = await storyModel.getById(story_id);
    let project;
    let user_list = [];

    if(story)
    {
        project = await projectModel.getById(story.project_id);
    }

    if(!story)
    {
        story = storyModel.getEmpty();
    }
    if(!project)
    {
        project = projectModel.getEmpty();
        user_list = await userModel.getAll();
    }
    else
    {
        user_list = await userModel.getByProject(project.id);
    }

    response.render('task', {session:request.session,
        csrfToken:request.csrfToken(),
        task: task,
        story: story,
        project: project,
        user_list: user_list,
        state: optionModel.work_state,
        stakeholder: optionModel.stakeholder,
        type: optionModel.task_type});
};

exports.post = async (request, response, next) => {
    /*update story*/
    console.log("Set Task");
    console.log(request.body);

    let task = new taskModel(request.body);
    let id = await task.save();
    
    console.log(`id is ${id}`);

    response.redirect(`/task/?id=${id}`);
}