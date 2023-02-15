import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicModule } from './public/public.module';
import { PublicRoutingModule } from './public/public-routing.module';
import { PrivateModule } from './private/private.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/intercepotors/auth.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { LoadingspinerComponent } from './loadingspiner/loadingspiner.component';

import { NgChartsModule } from 'ng2-charts';
import { PredictionComponent } from './prediction/prediction.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingspinerComponent,
    PredictionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    PublicModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgChartsModule
  ],
  providers:[ {provide : HTTP_INTERCEPTORS ,useClass: AuthInterceptor, multi: true},AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
