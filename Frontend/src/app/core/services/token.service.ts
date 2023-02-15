import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public token;
  public userName;
  public userEmail;
  constructor() { 
    this.token = new BehaviorSubject<boolean>(localStorage.getItem('token')? true:false);
    this.userName = new BehaviorSubject<boolean>(localStorage.getItem('username')? true:false);
    this.userEmail = new BehaviorSubject<boolean>(localStorage.getItem('useremail')? true:false);
  }

  //set user name 
   setUserName(user:string){
    localStorage.setItem('userName', user);
   }

   //get user name 

   getuserName(){
    return localStorage.getItem('userName');
   }


   //set useremail

   setuseremail(email:string){
        localStorage.setItem('useremail', email);
   }
   //get usermail 

   getuseremail(){
   return localStorage.getItem('useremail');
   }
  //set token 

 setToken(token:any){
   localStorage.setItem('token',token)
 }
 //get token 

 getToken(){
  return localStorage.getItem('token');
 }

   // remove token 

   removeToken(){
       localStorage.removeItem('token')
       localStorage.removeItem('userName')
       localStorage.removeItem('useremail')
   }

}
