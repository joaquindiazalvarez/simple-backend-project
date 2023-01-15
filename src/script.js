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
host: 'mysql',
user: 'joaquin',
password: '123456',
database: 'nodeapp',
});

mysqlConnection.connect((err)=>{
    if(!err) console.log('Connection Established Successfully');
    else console.log('Connection Failed!'+ JSON.stringify(err, undefined,2));
});

app.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM learnerdetails ',[req.params.id], (err, rows, fields) => {
    if(!err)
    res.send(rows);
    else
    console.log(err);
  })
})
app.post('/learners', (req, res)=>{
  let learner = req.body;
  if ("id" in learner && "name" in learner && "email" in learner && "course" in learner){
    var sql = "INSERT INTO learnerdetails (learner_id, learner_name, learner_email, course_id) VALUES (?, ?, ?, ?)"
    mysqlConnection.query(sql,[learner.id, learner.name, learner.email, learner.course], (err, rows, field) =>{
      if (!err)
      console.log('insert succeed');
      else
      console.log(err);
    })
    res.send(learner)
  }
  else
  res.send("error, you must specify, id, name, email, course")

});
app.delete('/learners/:id', (req, res) => {
  if("id" in req)
  mysqlConnection.query('DELETE FROM learnerdetails WHERE learner_id = ?', [req.params.id], (err, rows, fields) => {
  if (!err)
  res.send('Learner Record deleted successfully.');
  else
  console.log(err);
  res.send('err')
  })
  });
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Listening on port ${port}..`));