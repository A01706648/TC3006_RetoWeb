const path = require('path');
const storyModel = require('../model/storyModel.js');
const projectAssignModel = require('../model/projectAssignModel.js');
const projectModel = require('../model/projectModel.js');
const optionModel = require('../model/optionModel.js');
const userModel = require('../model/userModel.js');
const assignModel = require('../model/storyAssignModel.js');
const url = require('url');


exports.get = async (request, response, next) => {
    console.log('get project');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);
    let project_id = queryObj.id;

    //Get Cookie value
    //console.log('Cookie: ' + request.get('Cookie'));
    //console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]);//raw method
    
    //use cookie-parser
    //console.log(request.cookies);
    //console.log(request.cookies.last_id);

    
    let project_obj = await projectModel.getById(project_id);
    let story_list = await storyModel.getByProject(project_obj.id);
    let user_list = await userModel.getByProject(project_obj.id);
    let all_user_list = await userModel.getAll();
/*
    let project;
    let story_array;
    let user_array;

    projectModel.getById(project_id)
    .then(project_obj=>{
        project = project_obj;
        storyModel.getByProject(project.id)
        .then(story_list=>{
            story_array = story_list;
            projectAssignModel.getByProject(project.id)
            .then(user_list=>{
                user_array = user_list;
                console.log(project);
                response.render('project', {session:request.session,
                                            csrfToken:request.csrfToken(),
                                            project: project,
                                            story_list: story_array,
                                            user_list: user_array,
                                            state: optionModel.work_state});
            })
        });
    });
    */
   console.log(project_obj);
   response.render('project', {session:request.session,
                               csrfToken:request.csrfToken(),
                               project: project_obj,
                               story_list: story_list,
                               user_list: user_list,
                               all_user_list: all_user_list,
                               state: optionModel.work_state});   
}

exports.new = async (request, response, next) => {
    console.log('new project');

    let project_obj = projectModel.getEmpty();
    let story_list = [];//await storyModel.getByProject(project_obj.id);
    let user_list = [];//await projectAssignModel.getByProject(project_obj.id);  
    let all_user_list = await userModel.getAll();  

    response.render('project', {session:request.session,
                                csrfToken:request.csrfToken(),
                                project: project_obj,
                                story_list: story_list,
                                user_list: user_list,
                                all_user_list: all_user_list,
                                state: optionModel.work_state});
}

exports.post = async (request, response, next) => {
    /*update project*/
    console.log("Set Project");
    console.log(request.body);


    let project_obj = new projectModel(request.body);
    let id = await project_obj.save();
    if(id)
    {
        let assign = assignModel.getEmpty();
        assign.project_id = id;
        await assign.save();//add NOT Assigned to the project        
        //set cookie value
        response.setHeader('Set-Cookie', [`last_id=${id}; HttpOnly`]);    
        console.log(`id is ${id}`);
        response.redirect(`/project/?id=${id}`);
    }
    else
    {
        console.log("Save Project Fail");
    }
}

exports.assign = async (request, response, next) => {
    console.log(request.body);
    let assign = new assignModel(request.body);
    await assign.save();
    response.redirect(`/project/?id=${assign.project_id}`);
};

exports.unassign = async (request, response, next) => {
    const queryObj = url.parse(request.url, true).query;
    let project_id = queryObj.project_id;
    let user_id = queryObj.user_id;
    await assignModel.remove(project_id, user_id);
    response.redirect(`/project/?id=${project_id}`);
};