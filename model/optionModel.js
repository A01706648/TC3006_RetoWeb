const db = require('../util/database');

exports.getWorkState = ()=>{ return {"Init":0, "In Progress":1, "Done":2};};
exports.getTestState = ()=>{ return {"Init":0, "Testing":1, "Pass":2, "Fail":3};}
exports.getStakeholder = ()=>{return {"Client":0, "User":1, "Developer":2};};

let WorkState_Array = [];
let TestState_Array = [];
let Stakeholder_Array = [];
let Phase_Array = [];
let TaskType_Array = [];
let Cost_Array = [];
let Role_Array = [];

function getWorkState()
{
    return db.execute("SELECT * FROM work_state;");
}

function getTestState()
{
    return db.execute("SELECT * FROM test_state;");
}

function getStakeholder()
{
    return db.execute("SELECT * FROM stakeholder;");
}

function getPhase()
{
    return db.execute("SELECT * FROM phase;");
}

function getTaskType()
{
    return db.execute("SELECT * FROM task_type;");
}

function getCost()
{
    return db.execute("SELECT * FROM cost;");
}

function getRole()
{
    return db.execute("SELECT * FROM role;");
}


exports.init = ()=>{
    getWorkState()
    .then(([rows, fieldData]) => {
        WorkState_Array = [...rows];
        exports.work_state = WorkState_Array;
        //console.log(WorkState_Array);
    })
    .catch(err => {
        console.log(err);
    });
    
    getTestState()
    .then(([rows, fieldData]) => {
        TestState_Array = [...rows];
        exports.test_state = TestState_Array;
    })
    .catch(err => {
        console.log(err);
    });

    getStakeholder()
    .then(([rows, fieldData]) => {
        Stakeholder_Array = [...rows];
        exports.stakeholder = Stakeholder_Array;
    })
    .catch(err => {
        console.log(err);
    });

    getPhase()
    .then(([rows, fieldData]) => {
        Phase_Array = [...rows];
        exports.phase = Phase_Array;
    })
    .catch(err => {
        console.log(err);
    });

    getTaskType()
    .then(([rows, fieldData]) => {
        TaskType_Array = [...rows];
        exports.task_type = TaskType_Array;
    })
    .catch(err => {
        console.log(err);
    });

    getCost()
    .then(([rows, fieldData]) => {
        Cost_Array = [...rows];
        exports.cost = Cost_Array;
    })
    .catch(err => {
        console.log(err);
    });

    getRole()
    .then(([rows, fieldData]) => {
        Role_Array = [...rows];
        exports.role = Role_Array;
    })
    .catch(err => {
        console.log(err);
    });
    
};

