const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const userModel = require('../model/userModel');

function login_process(request, response)
{
    request.session.isLoggedIn = true;
    request.session.user_id = request.body.id;
    
    return request.session.save(err => {
        response.redirect('/home');
    });    
}

exports.postLogin = (request, response, next) => {
    console.log(request.body);
    /*
    fs.writeFileSync("LoginData", `User:${request.body.id}, Psw:${request.body.password}`);

    //to save the session data
    request.session.isLoggedIn = true;
    request.session.id = request.body.id;

    response.redirect('/home');
    */
   request.session.error = "";
   const id = request.body.id;
   console.log(id);
   userModel.fetchOneById(id)
       .then(([rows, fieldData]) => {
            if (rows.length < 1) 
            {
                console.log(`user id ${id} not found`);
                request.session.error = "The User and/or the Password is not Match";
                response.redirect('/user/login');
            } 
            else 
            {
                let user_obj = rows[0];
                console.log(user_obj);

                if(user_obj.password == null && user_obj.id=='admin')
                {//empty password
                    console.log('Admin Login');
                    return login_process(request, response);
                }
                else
                {//valid password
                    bcrypt.compare(request.body.password, rows[0].password)
                        .then(doMatch => {
                            if (doMatch) 
                            {
                                console.log('psw match');
                                return login_process(request, response);
                            }
                            else
                            {
                                console.log('psw NOT match');
                                request.session.error = "The User and/or the Password is not Match";
                                response.redirect('/user/login');
                            }
                        })
                        .catch(err => {
                            request.session.error = "The User and/or the Password is not Match";
                            response.redirect('/user/login');
                        });
                }
            }
       })
       .catch(err => {
           console.log(err);
       });    
}

exports.getLogin = (request, response, next) => {
    console.log('login');
    //response.sendFile(path.join(__dirname, '..','public', 'login.html'));
    response.render('login', {
        error:request.session.error,
        session:request.session,
        csrfToken:request.csrfToken(),
    });
}

exports.getLogout = (request, response, next) => {
    request.session.destroy((err) => {
        console.log(err);
        console.log('Logout');
        response.redirect('/'); // This code runs when the session is dropped.
    });
};

exports.getNew = (request, response, next) => {
    response.render('register', {
        session:request.session,
        csrfToken:request.csrfToken()
    });
};

exports.postNew = (request, response, next) => {
    const new_user = new userModel(request.body);
    new_user.save_old()
        .then(() => {
            request.session.isLoggedIn = true;
            request.session.id = request.body.id;
            response.redirect('/home');
        })
        .catch(err => console.log(err));
}


