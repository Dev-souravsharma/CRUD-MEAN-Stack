// Fields should be same as schema
export class User {
  name!:string;
  email!:string;
  password!:string;
  contact!:string;
  profile!:string;

}


export class loginUser{
  email!:string;
  password!:string
}

export class updateUser {
  id!:string
  name!:string;
  email!:string;
  contact!:string;
  profile!:string;
}
