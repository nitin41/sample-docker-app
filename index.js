'use strict';
var mysql = require('mysql');
var express = require('express');

var app = express();
var port = process.env.PORT || 8005;
var responseStr = "MySQL Data:";

app.get('/',function(req,res){
   
   var mysqlHost = process.env.MYSQL_HOST || 'localhost';
   var mysqlPort = process.env.MYSQL_PORT || '3306';
   var mysqlUser = process.env.MYSQL_USER || 'root';
   var mysqlPass = process.env.MYSQL_PASS || 'root';
   var mysqlDB   = process.env.MYSQL_DB   || 'sampledb';

   var pool  = mysql.createPool({
      connectionLimit : 10,
      host            : mysqlHost,
      user            : mysqlUser,
      password        : mysqlPass,
      database        : mysqlDB
   });
   
   pool.getConnection(function(err, connection) {
      if (err) throw err; // not connected!
      let createUser = `CREATE TABLE IF NOT EXISTS user (
         id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
         firstname VARCHAR(30) NOT NULL,
         lastname VARCHAR(30) NOT NULL,
         email VARCHAR(50),
         createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;

      connection.query(createUser, function(err, results, fields) {
         if (err) throw err;

         let sql = `INSERT INTO user(firstname,lastname,email) VALUES('Ramesh','Sahu','ramesh@eamil.it')`;

         connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            
            connection.query('SELECT * FROM user', function (error, results, fields) {
               connection.release();
               if (error) throw error;
            
               responseStr = '';
         
               results.forEach(function(data){
                  responseStr += data.id + ' : ';
                  responseStr += data.firstname + ' : ';
                  responseStr += data.lastname + ' : ';
                  responseStr += data.email + ' : ';
               });
         
               if(responseStr.length == 0)
                  responseStr = 'No records found';
         
               res.status(200).send(responseStr);
            });
         });
      });
   });   
});


app.listen(port, function(){
    console.log('Sample mySQL app listening on port ' + port);
});