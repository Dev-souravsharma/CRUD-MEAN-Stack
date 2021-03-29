// Imports
const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/passAuth';
// Console messagess
const success = ()=>console.log('connected successfully...');
const error = (error)=>{
    if(error)
       throw error;
}

// Connection
mongoose.connect(URL,{useUnifiedTopology:true},{useNewUrlParser:true}).then(success).catch(error);