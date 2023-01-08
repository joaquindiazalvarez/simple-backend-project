const mysql = require('mysql2');
const express = require ('express');
const bodyparser = require ('body-parser');

const app = express();
//configurando servidor express
app.use(bodyparser.json());

process.on('uncaughtException', function (err) {
    console.log(err);
  });

//conexion mysql
const mysqlConnection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '123456',
database: 'nodeapp',
});

mysqlConnection.connect((err)=>{
    if(!err) console.log('Connection Established Successfully');
    else console.log('Connection Failed!'+ JSON.stringify(err, undefined,2));
});

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Listening on port ${port}..`));