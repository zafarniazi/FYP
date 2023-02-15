import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { TokenService } from '../services/token.service';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _token: TokenService,private spinner : SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 
    this.spinner.requestStarted();
    const token = this._token.getToken();
    
    if(!token){
      return next.handle(request)
      .pipe(
        tap(
           (event: HttpEvent<unknown>) => {
             if(event instanceof HttpResponse){
                  this.spinner.requestEnded();
             }
           },
           (err: any) => {
              this.spinner.requestEnded();
           }
        )
      );
    }

    const req1 = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    // this.spinner.requestEnded()
    return next.handle(req1).pipe(
      tap(
        (event: HttpEvent<unknown>) => {
          if(event instanceof HttpResponse){
            this.spinner.requestEnded();
          }
        },
        (err: any) => { 
          this.spinner.requestEnded();
        }
      )
    )
  }
}
