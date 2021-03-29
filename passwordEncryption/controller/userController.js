require('../model/userModel');
require('../config/passportconfig');
const mongoose = require('mongoose');
let User = mongoose.model('user');
let jwt = require('jsonwebtoken');
const passport = require('passport');
const _ = require('lodash');

module.exports.addNewUser = (req,res)=>{
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password,
        profile:req.body.profile
    });

    return newUser.save().then((docs)=>{
        res.status(200).json({
            success:true,
            'message':'data inserted successfully',
            user:docs
        })
    }).catch((error)=>{
        res.status(401).json({
            success:false,
            message:'error in creation',
            error:error.message
        });
    });
}

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(error,user,info)=>{
        if(error)
            return res.status(404).json(err);
        if(user)
            return res.status(200).json({
                "token":jwt.sign({id:user._id},"ABc123",{
                    expiresIn:"2000m"
                })
            ,data:user
            })
        if(info)
            return res.status(401).json(info);
    })(req,res,next);
}


module.exports.userProfile=(req,res)=>{
    User.findOne({_id:req._id}).then((user)=>{

        return res.status(200).json({
            success:true,
            message:'user Found',
            data:_.pick(user,['_id','email'])
        })
    }).catch((err)=>{
        res.status(404).json({
            success:false,
            message:'user not found',
            err:err.message
        })
    })
}

// Find User
module.exports.selectedUser=(req,res)=>{
    return User.findById({_id:req.params.id}).select('name email contact profile').then((docs)=>{
      res.status(200).json({
        success:true,
        messasge:'User Record Found',
        data:docs
      })
    }).catch((err)=>{
      res.status(401).json({
        success:false,
        message:'User not found',
        err:err.message
      })
    })
  }


// Get All User
module.exports.getAllUserData=(req,res)=>{
  var mysort = { name: 1 };
  return User.find().sort(mysort).then(
    docs=>{
      res.status(200).json({
        success:true,
        messasge:'User Record Found',
        data:docs
      })
    }
  ).catch((err)=>{
    res.status(401).json({
      success:false,
      message:'User not found',
      err:err.message
    })
  });
}


// Delete user data
module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete({_id:id}).then((docs)=>{
      return res.status(201).json({
          success: true,
          message: "Record deleted successfully",
          data: docs
      })
  }).catch((err)=>{
      return res.status(401).json({
          success: false,
          message: "Failed to delete record",
          error: err.message
      })
  })
}


// Update User

// module.exports.updateuser=(req,res)=>{
//     const id =req.params.id;
//     const updatedata = req.body;
//   return User.updateOne({_id:id},{$set:updatedata}).exec().then(docs=>{
//         res.status(201).json({
//             success:true,
//             message:"Data updated Successfully",
//             data:docs
//         }).catch((err)=>{
//           res.status(401).json({
//             success:false,
//             message:"Error in updating data",
//             error:err.message
//         })
//         })

//     })
// }
module.exports.updateuser=(req,res)=>{
  const id =req.params.id;
  const updatedata = req.body;
  User.findByIdAndUpdate({_id:id},{$set:updatedata}).then((docs)=>{
      return res.status(200).json({
          success:true,
          message:"Data updated Successfully",
          data:docs
      })
  }).catch((err)=>{
    return res.status(401).json({
        success:false,
        message:"Error in updating data",
        error:err.message,
    })
    })
}
// module.exports.updateuser=async (req,res)=>{
//   try{
//   var id = req.params.id;
//   var updatedata = req.body;
//     const result = await User.updateOne({_id:id},{$set:updatedata});
//     console.log(result);
//   }
// catch(error){
//   console.log(error);
// }
// }
