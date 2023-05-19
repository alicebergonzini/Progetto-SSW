import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../classes';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class NewbookComponent implements OnInit {
  @Output() newBookEvent = new EventEmitter<Book>(); 
  bookForm: boolean = false;
  addbooktext: string = '+ Aggiungi un libro';
  constructor() {}
  ngOnInit() {}
  showForm() {
    if (this.bookForm == false) {
      this.bookForm = true;
      this.addbooktext = '- Nascondi';
    } else {
      this.bookForm = false;
      this.addbooktext = '+ Aggiungi un libro';
    }
  }
  onSubmit()  {
    var title: HTMLInputElement = document.getElementById('nbtitolo') as HTMLInputElement;
    var author: HTMLInputElement = document.getElementById('nbautore') as HTMLInputElement;
    var position: HTMLInputElement = document.getElementById('nbposizione') as HTMLInputElement;
    var newBook: Book = new Book(title.value, author.value, position.value, undefined);
    this.newBookEvent.emit(newBook);
    title.value = "";
    author.value = "";
    position.value = "";
  }
   
}



