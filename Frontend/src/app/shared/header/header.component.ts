import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { modalConfig, ModalEnum } from 'src/app/core/modals/modalConfigs';
import { ProfileComponent } from '../profile/profile.component';
const AOS = require("aos");
const $ = require('jquery');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  token: any;
  user:any ;
  username:any;
  handleMneu : boolean = false;
  constructor(
    private _token: TokenService,
    private router: Router,
    private _user: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._token.token.subscribe((res) => (this.token = res));
    this._token.userName.subscribe((res) => (this.user = res));

    if(localStorage.getItem('userName')) {
      this.userCredentail();
    }
    AOS.init();
    
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      var box = $('.header-text').height();
      var header = $('header').height();

      if (scroll >= box - header) {
        $('header').addClass('background-header');
      } else {
        $('header').removeClass('background-header');
      }
    });
  }

  public logout() {
    this._token.token.next(false);
    this._token.removeToken();
    this._user.removeidAfterlogout();
    this._token.userName.next(false)
    this._token.userEmail.next(false)
    this.router.navigate(['']);
  }

  public userCredentail() {  
  
       this.username =localStorage.getItem('userName')
      
   }
  public profileSetting() {
    const modal = this.dialog.open(
      ProfileComponent,
      modalConfig(
        {
          panelClass: ['animate__animated', 'animate__slideInRight', 'trendy'],
        },
        ModalEnum.ModalSmall
      )
    );
    modal.afterClosed().subscribe(() => {});
  }

  public onNavMenu() {
       this.handleMneu = !this.handleMneu;
  }
}
