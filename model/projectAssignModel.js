

class ProjectAssignClass
{
    static prorjectassign_list = [];

    constructor(user_id
                , project_id
                , role
                , weekhour)
    {
        this.user_id = user_id;
        this.project_id = project_id;
        this.creatDate = Date.now();
        this.role = role;
        this.weekhour = weekhour;
    }

    static create(user_id
                , project_id
                , role = 0
                , weekhour = 0)
    {
        let index = this.getIndex(project_id, user_id, role);
        let prorjectassign = undefined;
        if(index === undefined)
        {//the assign does not exist
            prorjectassign = new ProjectAssignClass(user_id
                                        , project_id
                                        , role
                                        , weekhour);
            this.prorjectassign_list.push(prorjectassign);
        }
        else
        {//the assigned already exist
            prorjectassign = this.prorjectassign_list[index];
            prorjectassign.weekhour = weekhour;
        }

        return prorjectassign;
    }

    static getByUser(user_id)
    {
        let returnProjectassign_list = [];

        for(prorjectassign of this.prorjectassign_list)
        {
            if(prorjectassign.user_id == user_id)
            {
                returnProjectassign_list.push(prorjectassign);
            }
        }

        return returnProjectassign;
    }

    static getByProject(project_id)
    {
        let returnProjectassign_list = [];

        for(prorjectassign of this.prorjectassign_list)
        {
            if(prorjectassign.project_id == project_id)
            {
                returnProjectassign_list.push(prorjectassign);
            }
        }

        return returnProjectassign_list;
    }

    static getIndex(project_id, user_id, role)
    {
        let count = 0;
        let returnCount = undefined;

        for(count = 0; count < this.prorjectassign_list; count ++)
        {
            if((this.prorjectassign_list[count].project_id == project_id)
                && (this.prorjectassign_list[count].user_id == user_id)
                && (this.prorjectassign_list[count].role == role))
            {
                returnCount = count;
                break;
            }
        }

        return returnCount;
    }

    static getList()
    {
        return this.prorjectassign_list;
    }
}

module.exports = ProjectAssignClass;