//const projectModel = require('../model/projectModel.js');
const homeModel = require('../model/homeModel.js')

let family_list = ['A', 'B'];

exports.get = async (request, response, next) =>
{
    //console.log(projectModel.getList().length);
    //const project_list = await projectModel.getAll();
    console.log('get home');
    //console.log(project_list);
    response.render('home', {session:request.session,
                                csrfToken:request.csrfToken(),
                                value:'',
                                result:''});
}

exports.post = async (request, response, next) => {
    /*update project*/
    console.log("post home");
    console.log(request.body);
    console.log(request.body['date']);
    result = homeModel.predict(request.body);
    response.render('home', {session:request.session,
                    csrfToken:request.csrfToken(),
                    value:result['sale'],
                    result:result['result'],
                    });  
}