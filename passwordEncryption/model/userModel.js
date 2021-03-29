const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    saltString:String
});

userSchema.pre('save',function(next){
    bcrypt.genSalt(10,(error,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltString=salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
mongoose.model('user',userSchema);
