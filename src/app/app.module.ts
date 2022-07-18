import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportingModule } from './reporting/reporting.module';
import { stubBackendInterceptor } from './reporting/_helpers/stub-backend.interceptor';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReportingModule
  ],
  providers: [
    stubBackendInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
