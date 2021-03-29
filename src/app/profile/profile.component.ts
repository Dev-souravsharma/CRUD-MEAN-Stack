import { Component, OnInit } from '@angular/core';
import { MatDialog ,MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../shared/user-service.service';
import { User } from '../shared/user.model';
import { UpdateDataComponent } from '../update-data/update-data.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  userId:any;
  panelOpenState = false;
  userDetails:any=[];
  testingData:any=[];

  items=[];
  constructor(public userService:UserServiceService,
    private activateRoute:ActivatedRoute,
    private route:Router,
    private dialog:MatDialog
    ) {

  }

  ngOnInit(): void {
    // console.log(this.userService.profiledata);
    // // this.UserDetails=this.userService.profiledata;
    if(!this.userService.isLoggedIn()){
      this.route.navigateByUrl('/');
    }


    this.userId=this.activateRoute.queryParams.subscribe(params=>{
        this.userId=params['id'];
        this.userService.getSelectedUser(this.userId).subscribe((res)=>{
            // console.log(res);
            this.userDetails=res;
        },(error)=>{
          // console.log(error);
        });
    })

    this.testingData=this.userService.getAllUserData().subscribe((res)=>{
      this.testingData=res;
      // console.log(this.testingData);

    },(error)=>
    console.log(error));
  }
  getAllData(){
      this.testingData=this.userService.getAllUserData().subscribe((res)=>{
        this.testingData=res;
        console.log(this.testingData);

      },(error)=>
      console.log(error));
  }

  deleteUser(id:string){
    this.userService.deleteUser(id).subscribe((res)=>{
      console.log("Deleted Successfully");
      this.getAllData();
    },(error)=>{
      throw error;
    })
  }

  logout(){
    this.route.navigateByUrl('/signin');
    return this.userService.removeToken();

  }

  updateData(value:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    this.dialog.open(UpdateDataComponent,dialogConfig);
    // Sending data to Service
    // console.log(value);
    this.userService.getDataFromProfileComponent(value);
    this.getAllData();
  }

}

