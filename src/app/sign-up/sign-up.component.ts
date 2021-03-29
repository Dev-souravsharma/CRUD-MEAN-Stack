import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( public userService:UserServiceService,private route:Router
    ,private _snackBar: MatSnackBar) { }
  // model:any=[];
  ngOnInit(): void {
  }
  onSubmit(F:NgForm){
    console.log(F.value);
    this.userService.addNewUser(F.value).subscribe((res)=>{
      console.log(res);
      this.route.navigateByUrl('/signin');
    },(err)=>{
      console.log(err);
      this.openSnackBar('Enter valid details','cancel');
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
