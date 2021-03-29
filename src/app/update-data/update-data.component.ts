import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {
  userId:any;
  userData:any;
  constructor(private dialogRef:MatDialogRef<UpdateDataComponent>,
    public userService:UserServiceService,
    private activateRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
  //   this.userId=this.activateRoute.queryParams.subscribe(params=>{
  //     this.userId=params['id'];
  //     this.userService.getSelectedUser(this.userId).subscribe((res)=>{
  //         console.log(res);
  //         this.userData=res;
  //     },(error)=>{
  //       console.log(error);
  //     });
  // })

  }
  onClose(){
    this.dialogRef.close();

  }

  onUpdate(formdata:NgForm){
      // console.log('Form data'+formdata.value);
      this.userService.updateData(this.userId,formdata.value).subscribe((res)=>{
        // console.log("Data updated successfully"+res);
      this.dialogRef.close();
      this.userService.getAllUserData();
      },(err)=>{
        // console.log(err);
      });
  }

  getId(id:string){
      this.userId=id;
  }


}
