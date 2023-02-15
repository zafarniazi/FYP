import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Subscriber } from 'rxjs';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss']
})
export class BlogpostComponent implements OnInit {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  posts !:any;
  like : string= 'None'
  constructor(private _api: HttpClient) {
    this._api.get('https://web-production-53d1.up.railway.app/api/blog/blog/').subscribe(
      res =>   { this.posts=res }
      )
   }

  ngOnInit(): void {
   console.log(this.posts && this.posts)
  }



 public onClicked(){
        alert("Clicked")
  }
}
