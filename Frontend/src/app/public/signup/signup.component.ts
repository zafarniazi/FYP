import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { TokenService } from 'src/app/core/services/token.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  exform : any;
  error = ""

  constructor(private _api:LoginService,private _router:Router,private _token:TokenService){

  }
  ngOnInit() {

  this.exform = new FormGroup({
    'name' : new FormControl(null, Validators.required),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'password' : new FormControl(null, [Validators.required]),
    'password2' : new FormControl(null, [Validators.required])
  });
  }

  clicksub() {
    const userObj=this.exform.value;
   this._token.removeToken();
    if(this.exform.valid){
      this._api.userRegister(userObj.email, userObj.name,userObj.password, userObj.password2).subscribe(
        res=> { console.log(res);  
         this._router.navigate(['/signin'])
        },
        err => { console.log(err) 
           this.error = err.error.error.email ? err.error.error.email : err.error.error  }
      )
    }else{
      alert("please fill all required field")
    }
    this.exform.reset();
  }




  get name() {
    return this.exform.get('name');
  }
  get email() {
    return this.exform.get('email');
  }
  get phone() {
    return this.exform.get('phone');
  }
  get message() {
    return this.exform.get('message');
  }
  get password() {
    return this.exform.get('password');
  }

}


 // 'phone' : new FormControl(
    //   null,
    //   [
    //     Validators.required,
    //     Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
    //   ]),
    // 'message' : new FormControl(null, [Validators.required, Validators.minLength(10)]),