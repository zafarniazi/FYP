import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-farmdata',
  templateUrl: './farmdata.component.html',
  styleUrls: ['./farmdata.component.scss']
})
export class FarmdataComponent implements OnInit {
  title = 'ng2-charts-demo';
  public barChartLegend = true;
  public barChartPlugins = [];
  weatherDay:any = []

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private _user: UserService) { }

  ngOnInit(): void {
     this.getFiveDayWeather()
  }
   
  getFiveDayWeather(){
    this._user.getWeatherDetails().subscribe(
       (res: any) => {
            this.weatherDay = res.list.slice(0,5)
        }
    ),
    (error:any) => { 
        console.log({error})
    }
  }
}
