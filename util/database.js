const mysql = require('mysql2');

/*
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'natgas_hu',
    password: '', 
    //multipleStatements:true,
});
*/
const pool = mysql.createPool({
    host: '34.94.52.152',
    user: 'root',
    database: 'NATGAS_HU',
    password: 'HuWenguang', 
    //multipleStatements:true,
});

module.exports = pool.promise();