import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Library, Book } from './classes';

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
  //metodo che chiama una callback sul dato e lo immette nel server
  setLibrary(library: Library, callback: Function): Observable<AjaxResponse<any>> {
    var updated: Library = callback(library);
    return ajax({
      method: 'POST',
      url: this.URL + 'set?key=' + this.apiKey,
      crossDomain: true,
      body: JSON.stringify(updated),
    });
  }
  //metodo che fa la subscribe di get e chiama una callback sul dato ottenuto
  getSub(callback: Function){
  this.getLibrary().subscribe({
    next: (x: AjaxResponse<any>) =>
      (callback(JSON.parse(x.response))),
    error: (err) =>
      console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
    });
  }
//metodo che fa la subscribe di set 
setSub(library: Library, callback: Function){
  this.setLibrary(library, callback).subscribe({
    next: (x: AjaxResponse<any>) => {},
    error: (err) => console.error('Errore: ' + JSON.stringify(err)),
  });
  }
}