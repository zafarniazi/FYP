import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';
const AOS = require("aos");

@Component({
  selector: 'app-introductory',
  templateUrl: './introductory.component.html',
  styleUrls: ['./introductory.component.scss']
})
export class IntroductoryComponent implements OnInit {
  exform: any;
  showMessage: boolean = false;
  card_array=[1,2,3,4] ;
  videioURL='https://www.youtube.com/embed/-rdopSZttqM';
  safeURL;
  constructor(private _sanitizer: DomSanitizer, private _api: UserService,){
    this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.videioURL);
 }

  ngOnInit(): void {
    AOS.init();
    this.exform = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }


public postData() {
  console.log(this.exform.value);
  this._api.contactUsApi(this.exform.value).subscribe(
    (res:any)=>{
       this.exform.reset();
       this.showMessage=true
    },
    (err:any)=>{ console.log(err.message)} 
  )
}

}
