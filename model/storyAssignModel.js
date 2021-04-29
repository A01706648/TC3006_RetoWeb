const db = require('../util/database')

class AssignClass
{
    constructor(assign_obj)
    {
        this.project_id = assign_obj.project_id;
        this.user_id = assign_obj.user_id;
        this.hour = assign_obj.hour;
    }

    static getEmpty()
    {
        return new AssignClass({project_id:null
                                , user_id:'null'
                                , hour:0});
    }

    dbsave()
    {
        console.log("save test ");
        return db.execute("CALL saveProjectAssignment(?, ?, ?);", [this.project_id, this.user_id, this.hour]);
    }

    save()
    {
        return this.dbsave()
        .then(([rows, fieldData]) => {
            //console.log(Object.keys(rows[0][0]));
            //let id = rows[0][0].id;
            return;// id;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static getById(project_id, user_id)
    {
        return this.fetchOneById(project_id, user_id)
        .then(([rows, fieldData]) => {
            if(rows.length == 0)
            {
                console.log(`assign P_${project_id} U_${user_id} not found, go to new test`);
            }
            else
            {//get the test obj
                console.log('Got assign');
                //console.log(rows[0]);
                let assign_obj = new AssignClass(rows[0]);
                return assign_obj;
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    static getAll()
    {
        return this.fetchAll()
        .then(([rows, fieldData]) => {
            let assign_list = [...rows];
            return assign_list;
        })
        .catch(err => {
            console.log(err);
        });
    }  

    static getByUser(user_id)
    {
        return this.fetchAllByUser(user_id)
        .then(([rows, fieldData]) => {
            let assign_list = [...rows];
            return assign_list;
        })
        .catch(err => {
            console.log(err);
        });               
    }

    static getByProject(project_id)
    {
        return this.fetchAllByProject(project_id)
        .then(([rows, fieldData]) => {
            let assign_list = [...rows];
            return assign_list;
        })
        .catch(err => {
            console.log(err);
        });               
    }

    static fetchOneById(project_id, user_id)
    {
        return db.execute('SELECT * FROM project_assignment WHERE project_id=? AND user_id=?', [project_id, user_id]);
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM project_assignment');
    }

    static fetchAllByUser(user_id)
    {
        return db.execute("SELECT * FROM project_assignment WHERE user_id=?", [user_id]);
    }    

    static fetchAllByStory(story_id)
    {
        return db.execute("SELECT * FROM project_assignment WHERE story_id=?", [story_id]);
    } 
    
    static remove(project_id, user_id)
    {
        return db.execute('DELETE FROM project_assignment WHERE project_id=? AND user_id=?', [project_id, user_id]);
    }
}

module.exports = AssignClass;