

class TaskClass
{
    static task_list = [];

    constructor(id
                , story_id
                , name
                , description
                , purpose
                , est_hour
                , real_hour
                , est_date
                , real_date
                , type
                , state)
    {
        this.id = id;
        this.story_id = story_id;
        this.name = name;
        this.description = description;
        this.purpose = purpose;
        this.creatDate = Date.now();
        this.est_hour = est_hour;
        this.real_hour = real_hour;
        this.est_date = est_date;
        this.real_date = real_date;
        this.type = type;
        this.state = state;
    }

    static create(id
                    , story_id
                    , name
                    , description = ''
                    , purpose = ''
                    , est_hour = undefined
                    , real_hour = 0
                    , est_date = undefined
                    , real_date = undefined
                    , type = 0
                    , state = 0)
    {
        let task = new TaskClass(id
                            , story_id
                            , name
                            , description
                            , purpose
                            , est_hour
                            , real_hour
                            , est_date
                            , real_date
                            . type
                            , state);
        this.task_list.push(task);

        return task;
    }

    static getCopyById(id)
    {
        let returnTask = null;

        for(task of this.task_list)
        {
            if(task.id == id)
            {
                returnTask = task;
                break;
            }
        }

        return returnTask;
    }

    static getByStory(story_id)
    {
        let returnTaskList = [];

        for(let task in this.task_list)
        {
            if(task.story_id == story_id)
            {
                returnTaskList.push(task);
            }
        }

        return returnTaskList;
    }

    static getList()
    {
        return this.task_list;
    }
}

module.exports = TaskClass;