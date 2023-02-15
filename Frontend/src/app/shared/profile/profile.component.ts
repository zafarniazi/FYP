import { Component, OnInit } from '@angular/core';
import { MatDialogRef ,} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  exform :any;
  email:any= "";
  constructor(public dialogRef: MatDialogRef<ProfileComponent> ,private _api:LoginService,private _token : TokenService) { 
  }

  ngOnInit(): void {
    // this._token.userEmail.subscribe((res) => (this.email = res));
   
    if(localStorage.getItem('useremail')){
      this.email = localStorage.getItem('useremail');
    }
    this.exform = new FormGroup({
      'password' : new FormControl(null, [Validators.required]),
      'newpassword' : new FormControl(null, [Validators.required]),
    });

    
  }

public changepassword() {
  console.log(this.exform.value) ;
  if(this.exform.valid){
    if( !this.exform.value.password=== this.exform.value.password2)
    {
      alert("Your password did not material");
    }
    this._api.changepassword({password: this.exform.value.password,password2: this.exform.value.newpassword}).subscribe(data=>{
      alert("Your password has been changed");
      this.close();
    })
  } else{
    alert("Please enter a valid password");
  }

}
  public close(): void {
    this.dialogRef.close();
  }
}
