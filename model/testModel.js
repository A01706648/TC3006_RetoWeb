const db = require('../util/database')

class TestClass
{
    constructor(test_obj)
    {
        this.id = test_obj.id;
        this.story_id = test_obj.story_id;
        this.user_id = test_obj.user_id;
        this.name = test_obj.name;
        this.description = test_obj.description;
        this.expect = test_obj.expect;
        this.comment = test_obj.comment;
        this.create_date = test_obj.create_date;
        this.state = state;
    }

    static getEmpty()
    {
        return    new TestClass({id:0
                                ,story_id:null
                                ,user_id:null
                                ,create_date :new Date().toISOString().split('T')[0]
                                ,name:''
                                ,description:''
                                ,expect :''
                                ,comment:''
                                , state:0});
    }    

    dbsave()
    {
        console.log("save test ");
        return db.execute("CALL saveTest(?, ?, ?, ?, ?, ?, ?, ?, ?);"
                        , [this.id, this.story, this.user_id, this.name, this.create_date, this.description, this.expect, this.comment, this.state]);        
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
                console.log(`test ${id} not found, go to new test`);
            }
            else
            {//get the test obj
                console.log('Got test');
                //console.log(rows[0]);
                let test_obj = new TestClass(rows[0]);
                return test_obj;
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
            let test_list = [...rows];
            return test_list;
        })
        .catch(err => {
            console.log(err);
        });
    }    

    static getByStory(story_id)
    {
        return this.fetchAllByStory(story_id)
        .then(([rows, fieldData]) => {
            let test_list = [...rows];
            return test_list;
        })
        .catch(err => {
            console.log(err);
        });        
    }

    static fetchOneById(id)
    {
        return db.execute('SELECT * FROM test WHERE id=?', [id]);
    }

    static fetchAll()
    {
        return db.execute('SELECT * FROM test');
    }

    static fetchAllByStory(story_id)
    {
        return db.execute('SELECT * FROM test WHERE story_id=?', [story_id]);
    }    
}

module.exports = TestClass;