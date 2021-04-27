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

    /*
    let project_obj = projectModel.getCopyById(queryObj.id);

    if(!project_obj)
    {
        project_obj = projectModel.getEmpty();
    }

    //console.log('state');
    //console.log((projectModel.getList())[0].state);
    */
    //Get Cookie value
    console.log('Cookie: ' + request.get('Cookie'));
    console.log(request.get('Cookie').split(';')[1].trim().split('=')[1]);//raw method
    
    //use cookie-parser
    //console.log(request.cookies);
    console.log(request.cookies.last_id);

    let project_obj = projectModel.getEmpty();

    projectModel.fetchOneById(project_id)
        .then(([rows, fieldData]) => {
            if(rows.length == 0)
            {
                console.log(`Project ${project_id} not found, go to new project`);
            }
            else
            {//get the project obj
                console.log('Got Project');
                //console.log(rows[0]);
                project_obj = new projectModel(rows[0]);
            }

            console.log(project_obj);
            response.render('project', {session:request.session,
                                        csrfToken:request.csrfToken(),
                                        project: project_obj,
                                        story_list: storyModel.getByProject(project_obj.id),
                                        user_list: projectAssignModel.getByProject(project_obj.id),
                                        state: optionModel.getWorkState()});
        })
        .catch(err => {
            console.log(err);
        });
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

exports.submit = (request, response, next) => {
    /*update project*/
    console.log("Set Project");
    console.log(request.body);

    let id = request.body.id;
    if(request.body.id == 0)
    {/*New Project*/
        id = projectModel.getList().length + 1;
        console.log('new');
        projectModel.create(id, request.body.name, request.body.description, request.body.state);
    }
    else
    {/*Modify Project*/
        console.log('modify');
        projectModel.modify(id, request.body.name, request.body.description, request.body.state);
    }

    //set cookie value
    response.setHeader('Set-Cookie', [`last_id=${id}; HttpOnly`]);    

    console.log(`id is ${id}`);

    response.redirect(`/project/?id=${id}`);
}