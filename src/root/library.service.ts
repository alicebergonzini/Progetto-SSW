import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Book } from './classes';

@Injectable()
export class LibraryService {
  apiKey: string = '5e5aa10f';
  URL: string =
    'https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/';
  //metodo che richiede il dato al server
  getLibrary(): Observable<AjaxResponse<any>> {
    return ajax({
      method: 'GET',
      url: this.URL + 'get?key=' + this.apiKey,
      crossDomain: true,
    });
  }
  //metodo che immette il dato nel server
  setLibrary(library: Array<Book>): Observable<AjaxResponse<any>> {
  return ajax({
    method: 'POST',
    url: this.URL + 'set?key=' + this.apiKey,
    crossDomain: true,
    body: JSON.stringify(library),
  });
  }
  //metodo che fa la subscribe di setLibrary
  setSub(library: Array<Book>){
  this.setLibrary(library).subscribe({
    next: (x: AjaxResponse<any>) => {},
    error: (err) => console.error('Errore: ' + JSON.stringify(err)),
    });
    }
  

}
  