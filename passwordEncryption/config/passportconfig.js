require('../model/userModel');

const passport = require('passport');
const localpassport = require('passport-local').Strategy;
const mongoose = require('mongoose');

let user = mongoose.model('user');

passport.use(new localpassport(
    {
    usernameField:'email'
},(username,password,done)=>{
    user.findOne({email:username},
        (err,user)=>{
            if(err)
                return done(err);
            else if(!user)
                return done(null,false,{message:'username not registered'});
            else if(!user.verifyPassword(password))
                return done(null,false,{message:'wrong password'});
            else
                {return done(null, user)}
        }
    )})
)

