require('./passwordEncryption/config/db');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

let api = require('./passwordEncryption/routes/userRoutes');
app.use(express.static(__dirname+"/dist/Authentication"));
// app.use(express.static(path.join(__dirname,"dist","CRUD-MEAN-Stack")));

app.use('/',api);
app.use((req,res,next)=>{
  // res.setHeader(Access-Control-Allow-Origin ,'*'),
  // res.setHeader(Access-Control-Allow-Methods ,'POST','GET','PUT','DELETE','OPTIONS'),
  // res.setHeader(Access-Control-Allow-Headers ,'Origin,Content-Type, Accept')
  // res.setHeader(Access-Control-Allow-Credentials,true)
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/*',function(req,res){
  res.sendFile(__dirname+"/dist/Authentication/index.html");
})

// Error message
const error =(error)=>{
    if(error)
        console.log("Error"+error);
    else
        console.log('Running at http://localhost:8000');
}

// Listen
app.listen(PORT,error);
