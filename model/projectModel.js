const db = require('../util/database')

class ProjectClass
{
    constructor(project_obj)
    {
        this.id = project_obj.id;
        this.name = project_obj.name;
        this.description = project_obj.description;
        this.create_date = project_obj.create_date;//new Date(project_obj.create_date);
        this.est_date = project_obj.est_date;//new Date(project_obj.est_date);
        this.state = project_obj.state;
    }

    static getEmpty()
    {
        return    new ProjectClass({id:0
                                    , name : ''
                                    , description : ''
                                    , create_date: new Date().toISOString().split('T')[0]
                                    , est_date: null
                                    , state : 0});
    }

    dbsave()
    {
        console.log("save project ");
        //console.log(this.est_date);
        return db.execute("CALL saveProject(?, ?, ?, ?, ?, ?);"
                        , [this.id, this.name, this.create_date, this.est_date, this.description, this.state]);
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
                console.log(`Project ${id} not found, go to new project`);
            }
            else
            {//get the project obj
                console.log('Got Project');
                //console.log(rows[0].id);
                let project_obj = new ProjectClass(rows[0]);
                return project_obj;
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
                console.log(rows);
                let project_list = [...rows];
                return project_list;
            })
            .catch(err => {
                console.log(err);
            });    
    }

    static getByUser(user_id)
    {
        return this.fetchAllByUser(user_id)
        .then(([rows, fieldData]) => {
            let project_list = [...rows];
            return project_list;
        })
        .catch(err => {
            console.log(err);
        });           
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM project');
    }

    static fetchAllByUser(user_id)
    {
        return db.execute("SELECT * \
        FROM project INNER JOIN project_assignment \
        ON project.id=project_assignment.project_id \
        WHERE project_assignment.user_id=?", [user_id]);
    }

    static fetchOneById(id)
    {
        return db.execute('SELECT * FROM project WHERE id=?', [id]);
    }
}

module.exports = ProjectClass;