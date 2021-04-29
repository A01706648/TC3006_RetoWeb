

class ProjectAssignClass
{
    constructor(assign_obj)
    {
        this.user_id = assign_obj.user_id;
        this.project_id = assign_obj.project_id;
        this.hour = assign_obj.hour;
    }

    static getEmpty()
    {
        
    }
}

module.exports = ProjectAssignClass;