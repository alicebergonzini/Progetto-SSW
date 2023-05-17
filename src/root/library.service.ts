import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Library } from './classes';

@Injectable()
export class LibraryService {
  apiKey: string = '6590f59c';
  URL: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';
  constructor() {}
  //metodo che richiede il dato al server
  getLibrary(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.URL + 'get?key=' + this.apiKey,
      crossDomain: true,
    });
  }
  //metodo che immette il dato nel server
  setLibrary(library: Library): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'POST',
      url: this.URL + 'set?key=' + this.apiKey,
      crossDomain: true,
      body: JSON.stringify(library),
    });
  }
}
