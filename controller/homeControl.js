const projectModel = require('../model/projectModel.js');

exports.get = (request, response, next) =>
{
    //console.log(projectModel.getList().length);
    projectModel.fetchAll()
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('home', {session:request.session,
                                        csrfToken:request.csrfToken(),
                                        project_list: rows});
        })
        .catch((err) => {
            console.log(err);
        });
}

