import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
// import { AlertService } from 'ngx-alerts';
import { map, catchError, tap, retry } from 'rxjs/operators';
import 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './app.settings';
import { isNull } from 'util';

// CONSTANT
@Injectable()
export class HttpService {
private appConfig = new AppSettings('local');
private tokenCadastroExterno;
private tokenRemuneracao;
private BASE_URL  = this.appConfig.url_base;

constructor
(
  private http: HttpClient,
  private router: Router
  ) {}
// private alertService: AlertService

prepareUrl(endpoint, data: Array<any> = null): string {
  let url = `${this.BASE_URL}${endpoint}`;
  if (data) { url += '?'; }
  for (const prop in data) {
    if (data[prop] !== null) {
      url += `${prop}=${data[prop]}&`;
    }
  }
  return url;
}

postObs(endpoint: string, data: any = null): Observable<any> {

  const headers = this.setUpHeaders();
  headers.append('Content-Type', 'application/json');
  console.log(`${this.BASE_URL}${endpoint}`);
  // console.log(JSON.stringify(data));

  return this.http.post<any>(`${this.BASE_URL}${endpoint}`, data, { headers: headers })
  .pipe(this.responseHandler)
  .pipe(catchError(this.handleErrorObs));

}
putObs(endpoint: string, data: any = null): Observable<any> {
  const headers = this.setUpHeaders();
  // headers.append('Content-Type', 'application/json');
  console.log(`${this.BASE_URL}${endpoint}`);

  return this.http.put<any>(`${this.BASE_URL}${endpoint}`, data, { headers: headers })
  .pipe(this.responseHandler)
  .pipe(catchError(this.handleErrorObs));
}

deleteObs(endpoint: string, data: any = null): Observable<any> {
  const headers = this.setUpHeaders();
  headers.append('Content-Type', 'application/json');

  const url = this.prepareUrl(endpoint, data);

  console.log(`${this.BASE_URL}${endpoint}`);
  return this.http.delete(url, { headers: headers })
    .pipe(map(this.responseHandler))
    .pipe(catchError(this.handleErrorObs));

}
getObs(endpoint: string, data: any = null): Observable<any> {
  const headers = this.setUpHeaders();

  const url = this.prepareUrl(endpoint, data);

  console.log(url);
  return this.http.get<any>(url, { headers: headers })
  .pipe(
    tap(this.responseHandler)
  )
  .pipe(
    catchError(err => this.handleErrorObs(err))
  );
}

getObs2(endpoint: string, data: any = null): Observable<any> {
  const headers = this.setUpHeaders();
  const url = this.prepareUrl(endpoint);
  return this.http.get<any>(url, { headers: headers, ...data })
    .pipe(
      tap(this.responseHandler)
    )
    .pipe(
      catchError(err => this.handleErrorObs(err))
    );
}

  setUpHeaders(): HttpHeaders {
  let headers: any;
  headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8'
      , 'Access-Control-Allow-Origin': '*'
      , 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      , 'Access-Control-Allow-Headers': 'Origin, Content-Type'
    });
    return headers;
  }
private responseHandler(response: any) {

  if (response.status === 401 && response.object === 403) {
    if (!isNull(response.message)) {
      // alert(response.message);
  }
  } else {
    return response;
  }
}

handleErrorObs(error: any) {
  const erroPadrao = 'Erro ao realizar ação. Tente novamente mais tarde';
  console.log(error);
  return throwError(new Error(error.message || erroPadrao));
}


}
