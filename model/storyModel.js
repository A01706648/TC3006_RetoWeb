const db = require('../util/database')

class StoryClass
{
    constructor(story_obj)
    {
        this.id = story_obj.id;
        this.project_id = story_obj.project_id;
        this.user_id = story_obj.user_id;
        this.name = story_obj.name;
        this.description = story_obj.description;
        this.purpose = story_obj.purpose;
        this.comment = story_obj.comment;
        this.stakeholder = story_obj.stakeholder;
        this.ap = story_obj.ap;
        this.creatDate = story_obj.create_date;
        this.est_date = story_obj.est_date;
        this.state = story_obj.state;
    }

    static getEmpty()
    {
        return    new StoryClass({id:0
                                    ,project_id:null
                                    ,user_id:null
                                    ,create_date :new Date().toISOString().split('T')[0]
                                    ,est_date:null
                                    ,stakeholder:0
                                    ,name:''
                                    ,description:''
                                    ,purpose :''
                                    ,comment:''
                                    ,ap:0
                                    , state:0});
    }

    dbsave()
    {
        console.log("save story ");
        return db.execute("CALL saveStory(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
                        , [this.id, this.project_id, this.user_id, this.name, this.create_date, this.est_date, this.description, this.purpose, this.comment, this.stakeholder, this.ap, this.state]);        
    }

    save()
    {
        this.dbsave()
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
        this.fetchOneById(id)
        .then(([rows, fieldData]) => {
            if(rows.length == 0)
            {
                console.log(`story ${id} not found, go to new project`);
            }
            else
            {//get the story obj
                console.log('Got story');
                //console.log(rows[0]);
                story_obj = new StoryClass(rows[0]);
                return story_obj;
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    static getAll()
    {
        this.fetchAll()
        .then(([rows, fieldData]) => {
            let story_list = [...rows];
            return story_list;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static getByProject(project_id)
    {
        this.fetchAllByProject(project_id)
        .then(([rows, fieldData]) => {
            let story_list = [...rows];
            return story_list;
        })
        .catch(err => {
            console.log(err);
        });        
    }

    static fetchOneById(id)
    {
        return db.execute('SELECT * FROM story WHERE id=?', [id]);
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM story');
    }

    static fetchAllByProject(project_id)
    {
        return db.execute('SELECT * FROM story WHERE project_id=?', [project_id]);
    }
}

module.exports = StoryClass;