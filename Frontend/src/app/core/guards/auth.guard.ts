import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  auth :any=false
  constructor(private _token:TokenService,private _router:Router){
    this._token.token.subscribe(res=>this.auth=res);
  }
  canActivate( ) {
    console.log(this.auth)
    if(this.auth){
     return true;
    }else{
      this._router.navigate(['/signin']);
      return false ;
    }
  }
  
}
