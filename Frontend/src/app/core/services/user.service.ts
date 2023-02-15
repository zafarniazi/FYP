import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyMxRecord } from 'dns';
import { config } from 'src/app/config/database';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api : any= config.API_URL ;
  access_token : any;
  headers= new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  });
  constructor(private http: HttpClient,private _token:TokenService) { 
      
  }


  healthanalysis(data:any){
    return this.http.post(this.api+'/api/healthanalysis/healthanalysis/',data) 
  }

  getHealthanalysis(id:any){
   return this.http.get(this.api+'/api/healthanalysis/healthanalysis/'+ id +'/')
  }

  getHealthanalysisDelete(id:any){
   return this.http.delete(this.api+'/api/healthanalysis/healthanalysis/'+id+'/')
  }

  getHealthanalysisAll(){
    return this.http.get(this.api+'/api/healthanalysis/healthanalysis/')
   }

 contactUsApi(data:any){
  return this.http.post(this.api+'/api/contactus/contactus/', data)
 }
setUserid(id:any){
   localStorage.setItem('userid',id);
}

getuserid(){
  return localStorage.getItem('userid');
}

removeidAfterlogout(){
  localStorage.removeItem('userid');
}

getTempInfo(){
  return this.http.get('https://web-production-53d1.up.railway.app/api/healthanalysis/weatherapi/')
}

//Get fiveDays weather 
getWeatherDetails(){
  return this.http.get('https://web-production-53d1.up.railway.app/api/healthanalysis/fivedayweather/')
}
//send post request to prediction

postPrediction(data:any) {
  return this.http.post(this.api + '/api/healthanalysis/yieldprediction/', data);
}
// mapData(){
//   return this.http.get('https://geodata.nationaalgeoregister.nl/nwbwegen/wms?request=GetCapabilities',{responseType: 'text'})
// }

}
