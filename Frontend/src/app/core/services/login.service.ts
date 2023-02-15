import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../config/database'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  baseUrl :string =config.API_URL

  constructor(private http: HttpClient) { }


   userLogin(email:string, password:any){
     
   return this.http.post(this.baseUrl + '/api/users/login', { email,password})

   }


   userRegister(email:string, name:string, password:any ,password2:any) { 
     return this.http.post(this.baseUrl + '/api/users/register', { name,email,password , password2})
   }

   changepassword(obj:any){
     return this.http.post(this.baseUrl + '/api/users/change_password',obj)
   }
}
