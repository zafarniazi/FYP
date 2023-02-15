import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnnotationComponent } from './annotation/annotation.component';
import { PrivateComponent } from './private.component';
const routes: Routes = [
  {
    path : "annotation", component:AnnotationComponent,
  }
  ,{
    path:"dashboard",
    loadChildren:()=> import("./analytics/analytics.module")
    .then(m => m.AnalyticsModule),
    canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
