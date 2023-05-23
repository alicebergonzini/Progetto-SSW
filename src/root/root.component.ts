import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import {ResearchComponent} from './research/research.component'
import { NewbookComponent } from './newbook/newbook.component';
import {Library, Book, User} from './classes';
import { ResultComponent } from './result/result.component';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [CommonModule, HeaderComponent, ResearchComponent, NewbookComponent, ResultComponent],
  standalone: true
})
export class RootComponent implements OnInit {
  library: Library = new Library([new Book("Il Fu Mattia Pascal", "Luigi Pirandello", "P222", undefined), new Book("Harry Potter e la Pietra Filosofale", "J.K. Rowling", "U820", undefined), new Book("Harry Potter e il Calice di Fuoco", "J.K. Rowling", "N712", undefined), new Book("Lolita", "Vladimir Nabakov", "B288", undefined), new Book("Orgoglio e Pregiudizio", "Jane Austen", "D749", new User("Pippo", "Baudo", 1)), new Book("I Promessi Sposi", "Alessandro Manzoni", "L332", undefined) ]);
  booksfound: Array<Book> = [];
  bf_message: string = "";
  
  constructor() { }

  ngOnInit() {
  }

  newbook(newbook: Book){
    this.library.addBook(newbook);
    console.log(this.library.books)
  }
  removebook(book: Book){
    if(confirm("Are you sure to delete " + book.titolo)) {
     this.library.deleteBook(book);
    }
    var div2del: HTMLDivElement = document.getElementById(book.posizione) as HTMLDivElement;
    div2del.remove();
  }
  searchbook(searchedstring: string){
    this.booksfound = [];
    if(searchedstring!=""){
      this.library.books.forEach((book)=>{
        var combined:string = book.titolo.toLowerCase() + book.autore.toLowerCase();
        if(combined.includes(searchedstring.toLowerCase())){
          this.booksfound.push(book);
        }
      })
      if(this.booksfound.length>1){
        this.bf_message = this.booksfound.length + " libri trovati";
      } else if (this.booksfound.length==1){
        this.bf_message = this.booksfound.length + " libro trovato";
      } else if (this.booksfound){
        this.bf_message = "Nessun libro trovato";
      }
      console.log(this.booksfound);
    }
  }

}

