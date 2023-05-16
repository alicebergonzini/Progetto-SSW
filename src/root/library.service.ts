import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Library } from './classes';

@Injectable()
export class LibraryService {
  apiKey: string = "6590f59c";
  URL: string = "https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/"
  constructor() { }
  getLibrary(): Observable<AjaxResponse<any>> {
    return ajax({
      //metodo ajax definito all'interno di angular
      method: 'GET',
      url: this.URL + "get?key=" + this.apiKey,
      crossDomain: true,
    });
  }
  //creare la classe book da passare al metodo
  addBook(library: Library): Observable<AjaxResponse<any>> {
    return ajax({
      //metodo ajax definito all'interno di angular
      method: 'POST',
      url: this.URL + "get?key=" + this.apiKey,
      crossDomain: true,
      body: JSON.stringify(library)
    });
  }

}