import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import { AjaxResponse } from 'rxjs/ajax';
import {ResearchComponent} from './research/research.component'
import { NewbookComponent } from './newbook/newbook.component';
import {Library, Book, User} from './classes';
import { ResultComponent } from './result/result.component';
import { LibraryService } from './library.service';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [CommonModule, HeaderComponent, ResearchComponent, NewbookComponent, ResultComponent],
  standalone: true,
  providers: [LibraryService],
})
export class RootComponent implements OnInit {
  library: Library = new Library([]);
  booksfound: Array<Book> = [];
  bf_count: number = 0;
  bf_message: string = "";
  isAdded: boolean = false;
  
  constructor(private ls: LibraryService) { }

  ngOnInit() {
  }
  //metodo che dentro la sub di get fa la set passandogli la libreria aggiornata con il nuovo libro
  newbook(book: Book){
    this.isAdded = false;
    this.ls.getLibrary().subscribe({
      next: (x: AjaxResponse<any>) => {
      var booklist = JSON.parse(x.response);
      this.library.adapt(booklist);
      this.library.addBook(book);
      this.ls.setSub(this.library.books);
      this.isAdded = true;
      },
      error: (err) =>
        console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
      });
    }
  //metodo che dentro la sub di get, elimina il libro passatogli come argomento dalla libreria e poi fa la set
  removebook(book: Book){
    if(confirm("Sei sicuro di voler eliminare '" + book.titolo + "' dalla tua libreria?")) {
      this.ls.getLibrary().subscribe({
      next: (x: AjaxResponse<any>) => {
        var booklist = JSON.parse(x.response);
        this.library.adapt(booklist);
        this.library.deleteBook(book);
        this.ls.setSub(this.library.books);
        var div2del: HTMLDivElement = document.getElementById(book.posizione) as HTMLDivElement;
        this.bf_count += -1;
        this.msgFound(this.bf_count);
        div2del.remove();
    },
    error: (err) =>
      console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
    });
    }
  }
  //metodo che dentro la sub di get itera sui libri e ricava la lista di libri che matchano la stringa messa nell'input di cerca
  searchbook(searchedstring: string){
    this.ls.getLibrary().subscribe({
      next: (x: AjaxResponse<any>) => {
        this.booksfound = [];
        var booklist = JSON.parse(x.response);
        this.library.adapt(booklist);
        if(searchedstring!=""){
          this.booksfound = this.library.books.filter((book) => (book.titolo.toLowerCase()+book.autore.toLocaleLowerCase()).includes(searchedstring.toLocaleLowerCase())); 
          this.bf_count = this.booksfound.length;
          this.msgFound(this.bf_count);
        } else {
          this.bf_message = "";
        } },
        error: (err) =>
        console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
      });
    }
  //metodo che restituisce un messaggio in base al numero di libri trovati
  msgFound(count:number){
    if(count>1){
      this.bf_message = count + " libri trovati";
    } else if (count==1){
      this.bf_message = count + " libro trovato";
    } else if(count==0){
      this.bf_message = "Nessun libro trovato";
    }
  }
  
}




