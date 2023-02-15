import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrivateComponent } from './private.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { PublicModule } from '../public/public.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FarmNewComponent } from './annotation/farm-new/farm-new.component';
import { MATERIALS } from '../app.material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AnalyticsComponent } from './analytics/analytics.component';
import {MatTableModule} from '@angular/material/table';
import { ShowndviComponent } from './analytics/showndvi/showndvi.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './analytics/dashboard/dashboard.component';
import { FarmdataComponent } from './analytics/farmdata/farmdata.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AnalyticsModule } from './analytics/analytics.module';
import { SidebarComponent } from './analytics/sidebar/sidebar.component';



@NgModule({
  declarations: [
    PrivateComponent,
    AnnotationComponent,
    FarmNewComponent,
    AnalyticsComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    PrivateRoutingModule,
    SharedModule,
    MATERIALS,
    FormsModule, 
    ReactiveFormsModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule
   
  ],
  exports:[AnnotationComponent],
})
export class PrivateModule { }
