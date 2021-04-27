exports.getWorkState = ()=>{ return {"Init":0, "In Progress":1, "Done":2};};
exports.getTestState = ()=>{ return {"Init":0, "Testing":1, "Pass":2, "Fail":3};}
exports.getStakeholder = ()=>{return {"Client":0, "User":1, "Developer":2};};