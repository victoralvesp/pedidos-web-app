import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-alerts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpClient } from '@angular/common/http';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    HttpService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
