const path = require('path');
const storyModel = require('../model/storyModel.js');
const projectAssignModel = require('../model/projectAssignModel.js');
const projectModel = require('../model/projectModel.js');
const optionModel = require('../model/optionModel.js');
const url = require('url');


exports.get = (request, response, next) => {
    console.log('get project');

    const queryObj = url.parse(request.url, true).query;
    console.log(queryObj);
    let project_id = queryObj.id;

    //Get Cookie value
    console.log('Cookie: ' + request.get('Cookie'));
    console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]);//raw method
    
    //use cookie-parser
    //console.log(request.cookies);
    console.log(request.cookies.last_id);

    let project_obj = projectModel.getById(project_id);


    console.log(project_obj);
    response.render('project', {session:request.session,
                                csrfToken:request.csrfToken(),
                                project: project_obj,
                                story_list: storyModel.getByProject(project_obj.id),
                                user_list: projectAssignModel.getByProject(project_obj.id),
                                state: optionModel.work_state});
}

exports.new = (request, response, next) => {
    console.log('new project');

    project_obj = projectModel.getEmpty();

    response.render('project', {session:request.session,
                                csrfToken:request.csrfToken(),
                                project: project_obj,
                                story_list: storyModel.getByProject(project_obj.id),
                                user_list: projectAssignModel.getByProject(project_obj.id),
                                state: optionModel.getWorkState()});
}

exports.post = (request, response, next) => {
    /*update project*/
    console.log("Set Project");
    console.log(request.body);


    let project_obj = new projectModel(request.body);
    let id = project_obj.save();
    if(id)
    {
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