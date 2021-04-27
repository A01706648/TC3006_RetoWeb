const db = require('../util/database')

class StoryClass
{
    static story_list = [];

    constructor(id
                , project_id
                , name
                , description
                , purpose
                , comment
                , stakeholder
                , ap
                , state)
    {
        this.id = id;
        this.project_id = project_id;
        this.name = name;
        this.description = description;
        this.purpose = purpose;
        this.comment = comment;
        this.stakeholder = stakeholder;
        this.ap = ap;
        this.creatDate = Date.now();
        this.state = state;
    }

    static getEmpty()
    {
        return    new StoryClass(0
                                , 0
                                , ''
                                , ''
                                , ''
                                , ''
                                , 0
                                , 0
                                , 0);
    }

    static create(id
                    , project_id
                    , name
                    , description = ''
                    , purpose = ''
                    , comment = ''
                    , stakeholder = 0
                    , ap = 0
                    , state = 0)
    {
        let story = new StoryClass(id
                                , project_id
                                , name
                                , description
                                , purpose
                                , comment
                                , stakeholder
                                , ap
                                , state);
        this.story_list.push(story);

        return story;
    }

    static modify(id
                    , project_id
                    , name
                    , description = ''
                    , purpose = ''
                    , comment = ''
                    , stakeholder = 0
                    , ap = 0
                    , state = 0)
    {
        let index = this.getIndexById(id);
        let story = null;


        if(index != -1)
        {
            this.story_list[index].name = name;
            this.story_list[index].description = description;
            this.story_list[index].purpose = purpose;
            this.story_list[index].comment = comment;
            this.story_list[index].stakeholder = stakeholder;
            this.story_list[index].ap = ap;
            this.story_list[index].state = state;
            
            project = this.story_list[index];
        }
        else
        {
            console.log("Project No Found");
        }
        return story;
    }

    static getCopyById(id)
    {
        let returnStory = null;

        for(let story of this.story_list)
        {
            if(story.id == id)
            {
                returnStory = story;
                break;
            }
        }

        return returnStory;
    }

    static getByProject(project_id)
    {
        let returnStory_list = [];

        for(let story of this.story_list)
        {
            if(story.project_id == project_id)
            {
                returnStory_list.push(story);
            }
        }

        return returnStory_list;        
    }

    static getIndexById(id)
    {
        return this.story_list.findIndex((element)=>{
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
        return this.story_list;
    }

    save()
    {
        return db.execute('INSERT INTO project (id, name, create_date, est_date, description, state) VALUES (?, ?, ?, ?, ?, ?)',
            [this.id, this.name, this.create_date, this.est_date, this.description, this.state]
            );
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