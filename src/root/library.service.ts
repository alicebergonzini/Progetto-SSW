import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Library, Book } from './classes';

@Injectable()
export class LibraryService {
  apiKey: string = '5e5aa10f';
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
  setLibrary(library: Library): Observable<AjaxResponse<any>> {
  return ajax({
    method: 'POST',
    url: this.URL + 'set?key=' + this.apiKey,
    crossDomain: true,
    body: JSON.stringify(library),
  });
  }
  //metodo che fa la subscribe di get e chiama una callback sul dato ottenuto
  addbook(book: Book){
  this.getLibrary().subscribe({
    next: (x: AjaxResponse<any>) => {
    var library: Library = JSON.parse(x.response);
    //perché mi dice che addbook non va bene?
    library.books.push(book);
    this.setSub(library);
    },
    error: (err) =>
      console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
    });
  }

  //metodo che fa la subscribe di set 
  setSub(library: Library){
  this.setLibrary(library).subscribe({
    next: (x: AjaxResponse<any>) => {},
    error: (err) => console.error('Errore: ' + JSON.stringify(err)),
    });
  }

  }