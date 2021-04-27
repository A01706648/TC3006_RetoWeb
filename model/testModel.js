

class TestClass
{
    static test_list = [];

    constructor(id
                , story_id
                , name
                , description
                , expect
                , comment
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
        this.expect = expect;
        this.comment = comment;
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
                    , expect = ''
                    , comment
                    , est_hour = undefined
                    , real_hour = 0
                    , est_date = undefined
                    , real_date = undefined
                    , type = 0
                    , state = 0)
    {
        let test = new TestClass(id
                            , story_id
                            , name
                            , description
                            , expect
                            , comment
                            , est_hour
                            , real_hour
                            , est_date
                            , real_date
                            , type
                            , state);
        this.test_list.push(test);

        return test;
    }

    static getCopyById(id)
    {
        let returnTest = null;

        for(let test of this.test_list)
        {
            if(test.id == id)
            {
                returnTest = test;
                break;
            }
        }

        return returnTest;
    }

    static getList()
    {
        return this.test_list;
    }

    static getByStory(story_id)
    {
        let returnTestList = [];

        for(let test in this.test_list)
        {
            if(test.story_id == story_id)
            {
                returnTestList.push(test);
            }
        }

        return returnTestList;
    }
}

module.exports = TestClass;