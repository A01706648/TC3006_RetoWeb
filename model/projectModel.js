const db = require('../util/database')

class ProjectClass
{
    static project_list = [];

    constructor(project_obj)
    {
        this.id = project_obj.id;
        this.name = project_obj.name;
        this.description = project_obj.description;
        this.creatDate = new Date(project_obj.creatDate);
        this.est_date = new Date(project_obj.est_date);
        this.state = project_obj.state;
    }

    static create(id
                    , name
                    , description 
                    , state)
    {
        let project = new ProjectClass(id
                                    , name
                                    , description
                                    , state);
        this.project_list.push(project);

        return project;
    }

    static modify(id
                , name
                , description
                , state)
    {
        let index = this.getIndexById(id);
        let project = null;


        if(index != -1)
        {
            this.project_list[index].name = name;
            this.project_list[index].description = description;
            this.project_list[index].state = state;
            
            project = this.project_list[index];

            console.log(this.project_list[index].description);
        }
        else
        {
            console.log("Project No Found");
        }
        return project;
    }

    static getEmpty()
    {
        return    new ProjectClass({id:0
                                    , name : ''
                                    , description : ''
                                    , create_date: (new Date()).toISOString()
                                    , est_date: null
                                    , state : 0});
    }

    returnObj()
    {
        return {id:this.id
                , name : this.name
                , description : this.description
                , create_date: this.creatDate
                , est_date: this.est_date
                , state : this.state};
    }

    save()
    {

    }

    static getCopyById(id)
    {
        return this.project_list.find((element)=>{
            if(element.id == id)
            {
                return true;
            }
            else
            {
                return false;
            }
        });
    }

    static getIndexById(id)
    {
        return this.project_list.findIndex((element)=>{
                    if(element.id == id)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                });
    }

    static getList()
    {
        return this.project_list;
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM project');
    }

    static fetchOneById(id)
    {
        return db.execute('SELECT * FROM project WHERE id=?', [id]);
    }
}

module.exports = ProjectClass;