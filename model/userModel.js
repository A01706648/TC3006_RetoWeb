const db = require('../util/database');
const bcrypt = require('bcryptjs');

class UserClass
{
    static user_list = [];

    constructor(user_obj)
    {
        this.id = user_obj.id;
        this.name = user_obj.name;
        this.password = user_obj.password;
        this.cost = user_obj.cost;
        this.role_id = user_obj.role_id;
    }

    static create(id
                , name
                , costcenter = 0
                , psw = '')
    {
        user = new UserClass(id
                            , name
                            , costcenter
                            , psw);
        this.user_list.push(user);

        return user;
    }

    static getCopyById(id)
    {
        returnUser = null;

        for(user of this.user_list)
        {
            if(user.id == id)
            {
                returnUser = user;
                break;
            }
        }

        return returnUser;
    }

    static getByName(name)
    {
        returnUserList = [];

        for(user of this.user_list)
        {
            if(user.name.includes(name))
            {
                returnUserList.push(user);
            }
        }

        return returnUserList
    }

    static getList()
    {
        return this.user_list;
    }

    save() {

        return bcrypt.hash(this.password, 12)
            .then((password_encripted) => {
                return db.execute(
                    'INSERT INTO user (id, name, password) VALUES (?, ?, ?)',
                    [this.id, this.name, password_encripted]
                );
            })
            .catch(err => console.log(err));  
    }

    static fetchOneById(id) 
    {
        return db.execute('SELECT * FROM user WHERE id=?', [id]);
    }    

    static getPrevilige(id)
    {
        ;
    }
}

module.exports = UserClass;