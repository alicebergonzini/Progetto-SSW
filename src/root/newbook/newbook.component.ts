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
  @Input() isAdded:boolean = false;
  @Output() newBookEvent = new EventEmitter<Book>(); 
  bookForm: boolean = false;
  addbooktext: string = '+ Aggiungi un libro';
  errorMsg: string = "";
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
    var formato: RegExp = /^[A-Z]\d{3}$/;
    var title: HTMLInputElement = document.getElementById('nbtitolo') as HTMLInputElement;
    var author: HTMLInputElement = document.getElementById('nbautore') as HTMLInputElement;
    var position: HTMLInputElement = document.getElementById('nbposizione') as HTMLInputElement;
    if(title.value == "" || author.value == "" || position.value == ""){
      this.isAdded=false;
      this.errorMsg = "Errore: Compila tutti i campi";
      return;
    }
    if(!formato.test(position.value)){
      this.errorMsg = "Inserisci formato corretto per la posizione!  e.g: S78L12";
      return;
    }
    
    //controllo che all'interno della libreria non ci sia già un libro a quella posizione
    
    this.errorMsg = "";
    var newBook: Book = new Book(title.value, author.value, position.value, undefined);
    this.newBookEvent.emit(newBook);
    title.value = "";
    author.value = "";
    position.value = "";
    
  }
   
}



