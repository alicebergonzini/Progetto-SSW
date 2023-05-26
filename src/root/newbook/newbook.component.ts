import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
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
  errorMsg: string = "";
  @Input() isAdded:boolean = false;
  constructor() {}
  ngOnInit() {}
  //metodo che in base al parametro bookForm, mostra o nasconde il form
  showForm() {
    this.isAdded=false;
    this.errorMsg = "";
    if (!this.bookForm) {
      this.bookForm = true;
      this.addbooktext = '- Nascondi';
    } else {
      this.bookForm = false;
      this.addbooktext = '+ Aggiungi un libro';
    }
  }
  //metodo che viene invocato quando il form viene "inviato";
  onSubmit()  {
    //aggiungere controlli sui singoli campi!!!
    var title: HTMLInputElement = document.getElementById('nbtitolo') as HTMLInputElement;
    var author: HTMLInputElement = document.getElementById('nbautore') as HTMLInputElement;
    var position: HTMLInputElement = document.getElementById('nbposizione') as HTMLInputElement;
    if(title.value == "" || author.value == "" || position.value == ""){
      this.isAdded=false;
      this.errorMsg = "Errore: Compila tutti i campi";
      return;
    }
    this.errorMsg = "";
    var newBook: Book = new Book(title.value, author.value, position.value, undefined);
    this.newBookEvent.emit(newBook);
    title.value = "";
    author.value = "";
    position.value = "";
    
  }
   
}



