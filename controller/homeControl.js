const projectModel = require('../model/projectModel.js');

exports.get = (request, response, next) =>
{
    //console.log(projectModel.getList().length);
    let project_list = projectModel.getAll();
    console.log(project_list);
    response.render('home', {session:request.session,
                                csrfToken:request.csrfToken(),
                                project_list: project_list});
}

