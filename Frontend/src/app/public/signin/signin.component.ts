import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import WMSCapabilities from 'ol/format/WMSCapabilities';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  exform: any;
  error: any = '';
  constructor(
    private api: LoginService,
    private _router: Router,
    private _token: TokenService,
    private _user: UserService
  ) {}
  ngOnInit() {
    this.exform = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  clicksub() {
    const val = this.exform.value;
    this._token.removeToken();
    this._user.removeidAfterlogout();
    if (this.exform.valid) {
      this.api.userLogin(val.email, val.password).subscribe(
        (res: any) => {
          console.log(res);
          this.error = '';
          this._user.setUserid(res.id_user);
          this._token.setUserName(res.user_name);
          this._token.setuseremail(res.user_email);
          this._token.setToken(res.token.access);
          this._token.token.next(true);
          this._token.userName.next(true);
          this._token.userEmail.next(true);
          this._router.navigate(['']);
        },
        (err) => {
          this.error = err.error.message;
        }
      );
    } else {
      alert('please enter required field');
    }

    this.exform.reset();
  }
  get email() {
    return this.exform.get('email');
  }

  get password() {
    return this.exform.get('password');
  }
}
