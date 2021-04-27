const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'natgas_hu',
    password: '', 
});

module.exports = pool.promise();