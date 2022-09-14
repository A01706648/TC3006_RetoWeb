//const projectModel = require('../model/projectModel.js');

let family_list = [];

exports.get = async (request, response, next) =>
{
    //console.log(projectModel.getList().length);
    //const project_list = await projectModel.getAll();
    console.log('get home');
    //console.log(project_list);
    response.render('home', {session:request.session,
                                csrfToken:request.csrfToken()});
}

exports.post = async (request, response, next) => {
    /*update project*/
    console.log("post home");
    console.log(request.body);
    response.render('home', {session:request.session,
                    csrfToken:request.csrfToken()});  
}