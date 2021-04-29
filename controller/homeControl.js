const projectModel = require('../model/projectModel.js');

exports.get = async (request, response, next) =>
{
    //console.log(projectModel.getList().length);
    const project_list = await projectModel.getAll();
    console.log('home');
    console.log(project_list);
    response.render('home', {session:request.session,
                                csrfToken:request.csrfToken(),
                                project_list: project_list});
}

