const mysql = require('mysql');
const express = require ('express');
const bodyparser = require ('body-parser');

const app = express();
//configurando servidor express
app.use(bodyparser.json());

//conexion mysql
const mysqlConnection = mysql.createConnection({
host: 'localhost',
user: 'joaquin',
password: '123456',
database: 'nodeapp',
multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err) console.log('Connection Established Successfully');
    else console.log('Connection Failed!'+ JSON.stringify(err, undefined,2));
});

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Listening on port ${port}..`));