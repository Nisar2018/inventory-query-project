require("dotenv").config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const storewiseselect= require('./operation/storewiseselect')


// set views file
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
// set view engine
app.set('view engine','ejs');



//app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use('',storewiseselect);

  
 let port = process.env.PORT;
 if (port == null || port == "") {
   port = 5000;
 }
 app.listen(port);

  