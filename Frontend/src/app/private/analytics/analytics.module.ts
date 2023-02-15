import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FarmdataComponent } from './farmdata/farmdata.component';
import { ShowndviComponent } from './showndvi/showndvi.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MATERIALS } from 'src/app/app.material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    ShowndviComponent,
    DashboardComponent,
    // SidebarComponent,
    FarmdataComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    CommonModule,
    MatExpansionModule,
    SharedModule,
    MATERIALS,
    FormsModule, 
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    NgChartsModule
 
    
  ]
})
export class AnalyticsModule { }
