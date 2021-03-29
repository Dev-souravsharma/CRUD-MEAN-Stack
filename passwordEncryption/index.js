require('./config/db');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

let api = require('./routes/userRoutes');

app.use('/',api);
app.use((req,res,next)=>{
  res.setHeader(Access-Control-Allow-Origin ,'*'),
  res.setHeader(Access-Control-Allow-Methods ,'POST','GET','PUT','DELETE','OPTIONS'),
  res.setHeader(Access-Control-Allow-Headers ,'Origin,Content-Type, Accept')
  res.setHeader(Access-Control-Allow-Credentials,true)
});
// Error message
const error =(error)=>{
    if(error)
        console.log("Error"+error);
    else
        console.log('Running at http://localhost:8000');
}

// Listen
app.listen(PORT,error);
