const path = require('path');



const url = require('url');


exports.get = async (request, response, next) => {
    console.log('get predict');

    /*
    response.render('predict', {session:request.session,
                               csrfToken:request.csrfToken()
                            });  */
    response.redirect('home');                             
}

exports.new = async (request, response, next) => {
    console.log('new predict');
/*
    response.render('predict', {session:request.session,
                                csrfToken:request.csrfToken()
                            });
  */  
                            response.redirect('home');     
}

exports.post = async (request, response, next) => {
    /*update project*/
    console.log("Set predict");
    console.log(request.body);
    response.redirect('home');     
}