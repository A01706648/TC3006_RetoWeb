const db = require('../util/database')

class TaskClass
{
    constructor(task_obj)
    {
        this.id = task_obj.id;
        this.story_id = task_obj.story_id;
        this.user_id = task_obj.user_id;
        this.name = task_obj.name;
        this.description = task_obj.description;
        this.purpose = task_obj.purpose;
        this.comment = task_obj.comment;
        this.create_date = task_obj.create_date;
        this.est_hour = task_obj.est_hour;
        this.real_hour = task_obj.real_hour;
        this.est_date = task_obj.est_date;
        this.real_date = task_obj.real_date;
        this.type = task_obj.type;
        this.state = task_obj.state;
        this.stakeholder = task_obj.stakeholder;
        this.value = task_obj.value;
    }

    static getEmpty()
    {
        return new TaskClass({id:0
                            ,story_id:null
                            ,user_id:null
                            ,name:''
                            ,description:''
                            ,purpose:''
                            , comment:''
                            , create_date:new Date().toISOString().split('T')[0]
                            , est_hour:0
                            , real_hour:0
                            , est_date:new Date().toISOString().split('T')[0]
                            , real_date:new Date().toISOString().split('T')[0]
                            , type:0
                            , state:0
                            , stakeholder:0
                            , value:0
                                });
    }

    dbsave()
    {
        console.log("save task ");
        return db.execute("CALL saveTask(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
                        , [this.id, this.story_id, this.user_id, this.name, this.create_date, this.est_date, this.real_date, this.description, this.purpose, this.comment, this.est_hour, this.real_hour, this.stakeholder, this.value, this.type, this.state]);        
    }

    save()
    {
        return this.dbsave()
        .then(([rows, fieldData]) => {
            //console.log(Object.keys(rows[0][0]));
            let id = rows[0][0].id;
            return id;
        })
        .catch(err => {
            console.log(err);
        });        
    }

    static getById(id)
    {
        return this.fetchOneById(id)
        .then(([rows, fieldData]) => {
            if(rows.length == 0)
            {
                console.log(`task ${id} not found, go to new project`);
            }
            else
            {//get the task obj
                console.log('Got task');
                //console.log(rows[0]);
                let task_obj = new TaskClass(rows[0]);
                return task_obj;
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
            let task_list = [...rows];
            return task_list;
        })
        .catch(err => {
            console.log(err);
        });
    }    

    static getByStory(story_id)
    {
        return this.fetchAllByStory(story_id)
        .then(([rows, fieldData]) => {
            let task_list = [...rows];
            return task_list;
        })
        .catch(err => {
            console.log(err);
        });        
    }

    static fetchOneById(id)
    {
        return db.execute('SELECT * FROM task WHERE id=?', [id]);
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM task');
    }

    static fetchAllByStory(story_id)
    {
        return db.execute('SELECT * FROM task WHERE story_id=?', [story_id]);
    }    
}

module.exports = TaskClass;