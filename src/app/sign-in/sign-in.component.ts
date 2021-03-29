import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {UserServiceService} from '../shared/user-service.service'


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  showmessage=false;
  errorMessage=false;

  resData:any=[];
  error:string='';
  id!:string;
  constructor(public userservice:UserServiceService,
    private router:Router,
    private _snackBar: MatSnackBar
    ) {

     }

  ngOnInit(): void {
  }


  login(f:NgForm)
  {
    // console.log(f.value);
    this.userservice.loginUser(f.value).subscribe((res)=>{
      // console.log(res);
      this.resData = res;
      this.userservice.userData(this.resData);
      // console.log(this.resData.token);
      this.userservice.setToken(this.resData.token);
      this.id=this.resData.data._id;
      // this.router.navigateByUrl('/profile');
      this.router.navigate(['/profile'],{"queryParams":{id:this.id}})
      // console.log(this.id);
      this.showmessage=true;
    },
    (error)=>{
      this.errorMessage=true;
      this.error=error;
      this.openSnackBar("Enter valid email and password","cancel");
      // console.log(error);
    });

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
