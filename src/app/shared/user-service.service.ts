import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginUser, User , updateUser} from './user.model';
import {environment} from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
   newUser:User={
      name:'',
      email:'',
      password:'',
      contact:'',
      profile:''
  }

  existingUser:loginUser={
    email:'',
    password:''
  }

  update:updateUser={
    id:'',
    name:'',
    email:'',
    contact:'',
    profile:''
  }

  profiledata:any=[];
  constructor(private http:HttpClient) { }

  addNewUser(newuser:User){
      return this.http.post(environment.apiBaseUrl+'newUser',newuser);
  }
  loginUser(verifyUser:loginUser)
  {
   return this.http.post(environment.apiBaseUrl+'auth',verifyUser);
  }


  //Store User token
  setToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  userData(data:any){
    return this.profiledata=data;
  }

  getPayload(){
    let token = JSON.stringify(this.getToken());
    let userPayload = atob(token.split('.')[1]);
    // console.log('User Payload :' + userPayload );
    if(userPayload){
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
    let userPayload = this.getPayload();
    if(userPayload)
      return userPayload.exp>Date.now()/1000;
    else
      return null;
  }

  getSelectedUser(id:string){
      return this.http.get(environment.apiBaseUrl+"selectuser/"+id);
  }

  getAllUserData(){
    return this.http.get(environment.apiBaseUrl+"alluserdata");
  }

  deleteUser(id:string){
    return this.http.delete(environment.apiBaseUrl+"api/deleteUser/"+id);
  }
  updateData(id:string,updateDataForUser:any){
      return this.http.put(environment.apiBaseUrl+"api/updateData/"+id,updateDataForUser);
  }
  // Getting Data from profile
  getDataFromProfileComponent(data:any){
      this.update.id=data._id;
      this.update.name=data.name;
      this.update.email=data.email;
      this.update.contact=data.contact;
      this.update.profile=data.profile;
  }
}

