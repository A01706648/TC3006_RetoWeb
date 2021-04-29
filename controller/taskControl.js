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
    let user_list;
    if(task)
    {
        story = await storyModel.getById(task.story_id);
        
        user_list = await userModel.getAll();
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