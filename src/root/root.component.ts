import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import {ResearchComponent} from './research/research.component'
import { NewbookComponent } from './newbook/newbook.component';
import {Library, Book} from './classes';
import { ResultComponent } from './result/result.component';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [CommonModule, HeaderComponent, ResearchComponent, NewbookComponent, ResultComponent],
  standalone: true
})
export class RootComponent implements OnInit {
  library: Library = new Library([new Book("Il Fu Mattia Pascal", "Luigi Pirandello", "P222", undefined), new Book("Harry Potter e la Pietra Filosofale", "J.K. Rowling", "U820", undefined), new Book("Harry Potter e il Calice di Fuoco", "J.K. Rowling", "N712", undefined) ]);
  booksfound: Array<Book> = [];
  bf_message: string = "";
  
  constructor() { }

  ngOnInit() {
  }

  newbook(newbook: Book){
    this.library.books.push(newbook);
    console.log(this.library.books)
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

