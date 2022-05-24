const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const sql = require('mssql');
const app = express();
const router =express.Router();
//const config=require('./dbConfig');
const storewiseselect= require('./operation/storewiseselect')
// set views file
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
// set view engine
app.set('view engine','ejs');



//app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use('',storewiseselect);

  // create web server
  const  webserver = app.listen(process.env.PORT||5000, function(){
    console.log('Node web server is running');
  });
  