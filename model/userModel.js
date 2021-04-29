const db = require('../util/database');
const bcrypt = require('bcryptjs');

class UserClass
{
    constructor(user_obj)
    {
        this.id = user_obj.id;
        this.name = user_obj.name;
        this.password = user_obj.password;
        this.cost = user_obj.cost;
        this.role_id = user_obj.role_id;
    }

    save_old() {

        return bcrypt.hash(this.password, 12)
            .then((password_encripted) => {
                return db.execute(
                    'INSERT INTO user (id, name, password) VALUES (?, ?, ?)',
                    [this.id, this.name, password_encripted]
                );
            })
            .catch(err => console.log(err));  
    }

    dbsave()
    {
        return bcrypt.hash(this.password, 12)
            .then((password_encripted) => {
                console.log("save user");
                return db.execute("CALL saveUser(?, ?, ? ,? ,?)", [this.id, this.name, password_encripted, this.cost, this.role_id]);
            })
            .catch(err => console.log(err));  
    }

    dbsaveNew()
    {
        return bcrypt.hash(this.password, 12)
            .then((password_encripted) => {
                console.log("new user");
                return db.execute("CALL newUser(?, ?, ? ,? ,?)", [this.id, this.name, password_encripted, this.cost, this.role_id]);
            })
            .catch(err => console.log(err));  
    }    

    save()
    {
        return this.dbsave()
        .then(([rows, fieldData]) => {
            //console.log(Object.keys(rows[0][0]));
            //let id = rows[0][0].id;
            return this.id;
        })
        .catch(err => {
            console.log(err);
        });
    }

    saveNew()
    {
        return this.dbsave()
        .then(([rows, fieldData]) => {
            console.log(Object.keys(rows[0][0]));
            let id = rows[0][0].id;
            return this.id;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static getByid(id)
    {
        return this.fetchOneById(id)
        .then(([rows, fieldData]) => {
            if(rows.length == 0)
            {
                console.log(`user ${id} not found, go to new project`);
            }
            else
            {//get the story obj
                console.log('Got user');
                //console.log(rows[0]);
                let user_obj = new UserClass(rows[0]);
                return user_obj;
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    static getByProject(project_id)
    {
        return this.fetchAllByProject(project_id)
        .then(([rows, fieldData]) => {
            let user_list = [...rows];
            return user_list;
        })
        .catch(err => {
            console.log(err);
        }); 
    }

    static getAll()
    {
        return this.fetchAll()
        .then(([rows, fieldData]) => {
            let user_list = [...rows];
            return user_list;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static fetchOneById(id) 
    {
        return db.execute('SELECT * FROM user WHERE id=?', [id]);
    }    

    static fetchAll()
    {
        return db.execute('SELECT * FROM user');
    }

    static fetchAllByProject(project_id)
    {
        return db.execute("SELECT * \
        FROM user INNER JOIN project_assignment ON user.id=project_assignment.user_id \
        WHERE project_assignment.project_id=? AND user.id!='null';", [project_id]);
    }    

    static getPrevilige(id)
    {
        ;
    }
}

module.exports = UserClass;