import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// import { AlertModule, AlertService } from 'ngx-alerts';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AlertModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    HttpClient,
    // AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
