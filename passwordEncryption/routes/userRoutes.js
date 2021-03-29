const express = require('express');
const appRoutes = express.Router();

const userCtrl = require('../controller/userController');
const jwthelper = require('../config/jwtHelper');

appRoutes.post('/newUser',userCtrl.addNewUser);
appRoutes.post('/auth',userCtrl.authenticate);
appRoutes.get('/profile',jwthelper.verifytoken,userCtrl.userProfile);
appRoutes.get('/selectuser/:id',userCtrl.selectedUser);
appRoutes.get('/alluserdata',userCtrl.getAllUserData);
appRoutes.delete('/api/deleteUser/:id',userCtrl.deleteUser);
appRoutes.put('/api/updateData/:id',userCtrl.updateuser);
module.exports=appRoutes;
