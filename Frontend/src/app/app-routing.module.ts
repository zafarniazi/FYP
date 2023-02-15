import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AnalyticsComponent } from './private/analytics/analytics.component';

import { AnnotationComponent } from './private/annotation/annotation.component';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent
  }
  ,{
    path:"private",
    loadChildren:()=> import("./private/private.module")
    .then(m => m.PrivateModule),
    canActivate:[AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
