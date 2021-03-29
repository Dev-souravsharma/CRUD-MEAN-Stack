// Imports
const mongoose = require('mongoose');

const URL = 'mongodb+srv://mydb:mydb123@cluster0.alnct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// Console messagess
const success = ()=>console.log('connected successfully...');
const error = (error)=>{
    if(error)
       throw error;
}

// Connection
mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true}).then(success).catch(error);
