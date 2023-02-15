import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ShowndviComponent } from '../showndvi/showndvi.component';
import { modalConfig, ModalEnum } from 'src/app/core/modals/modalConfigs';
import { reset } from 'ol/transform';
import { PredictionComponent } from 'src/app/prediction/prediction.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'path',
    'area',
    'userID',
    'view',
    'predict',
    'actions'
  ];
  dataSource: MatTableDataSource<any>;
  alldata: any = [];
  area:any;
  exForm :any
  tempInfo:any={
    temp:"",
    rel_hum:"",
    rain:100,
    avg_sun:5,
    cloud:"",
  }
  predictValue:any;
  showform :boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _user: UserService,
    private _router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
     ) {
      this.dataSource = new MatTableDataSource(this.alldata);
      this.area=this.route.snapshot.paramMap.get('area')
      
    }

  ngOnInit(): void {
    this.getAll();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.GetTemperatureInfo()
  }
  deleteRow(id:number){
    const res = confirm("Are you sure you want to delete") 
    if(!res) return 
      this._user.getHealthanalysisDelete(id).subscribe((res) => {
        this.getAll();
    },
    (error) => console.log(error)
    
    )

    
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public viewMap(id: any) {
    const modal = this.dialog.open(
      ShowndviComponent,
      modalConfig(
        {
          data: {
            id,
          },
          panelClass: ['animate__animated', 'animate__slideInRight', 'trendy'],
        },
        ModalEnum.ModalDefault
      )
    );
    modal.afterClosed().subscribe(() => {});
  }


  
  getAll(){
    this.alldata=[];
    this._user.getHealthanalysisAll().subscribe(
      (res: any) => {
        console.log(res)  
        res.forEach((item: any) => {
          this.alldata.push({
            id: item.id,
            name: item.name,
            path: item.mean_value,
            userID: item.user,
            area :item.yield_area.toFixed(5)

          });
        });
        this.dataSource = new MatTableDataSource(this.alldata);
        this.cdr.detectChanges();
        // console.log(this.dataSource)
      },
      (error) => console.log(error)
    );
  }
 
  // get Temperature info 

  GetTemperatureInfo(){
    // temperature API call
    this._user.getTempInfo().subscribe(
      ({main, clouds}:any) =>   { 
        console.log(main)
          this.tempInfo.temp=main.temp;
          this.tempInfo.rel_hum=main.humidity;
          this.tempInfo.cloud=clouds.all;

       },
      err => { console.log(err) }
    )
  }

  // Form data 
  onClick(data:any) {
    const dataObj = {
      ...this.tempInfo,
      ndvi : data.path,
      hectares : data.area
    }
    this._user.postPrediction(dataObj).subscribe(
      res =>   { 
       this.predictValue = res 
       this.showPredictedValue(res, dataObj)
     
    },
      err => { console.log(err); }
    )
  }

  //create Modal 

  public showPredictedValue(predictValue:any, fieldData:any): void {
    const modal = this.dialog.open(
      PredictionComponent,
      modalConfig(
        {
          data: {
            predictValue,
            fieldData
          },
          panelClass: ['animate__animated', 'animate__slideInRight', 'trendy'],
        },
        ModalEnum.ModalSmall
      )
    );
    modal.afterClosed().subscribe(() => {});
  }

}
