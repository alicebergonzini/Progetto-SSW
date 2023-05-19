import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import {ResearchComponent} from './research/research.component'
import { NewbookComponent } from './newbook/newbook.component';
import {Library, Book} from './classes';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [CommonModule, HeaderComponent, ResearchComponent, NewbookComponent],
  standalone: true
})
export class RootComponent implements OnInit {
  library: Library = new Library([new Book("Il Fu Mattia Pascal", "Luigi Pirandello", "P222", undefined), new Book("Harry Potter e la Pietra Filosofale", "J.K. Rowling", "U820", undefined) ]);
  constructor() { }

  ngOnInit() {
  }

  newbook(newbook: Book){
    this.library.books.push(newbook);
    console.log(this.library.books)
  }

}

