import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'farmer-portal-structure';
  mobile = false;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    console.log("Window Called")
    if (window.screen.width <= 760) { // 768px portrait
      this.mobile = true;
    }
  }
constructor() {
    this.getScreenSize();
 }
 
  closeMidal(){
    this.mobile=false
  }
}
