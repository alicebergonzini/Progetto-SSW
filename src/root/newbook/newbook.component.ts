import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { Book, Library } from '../classes';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css'],
  imports: [CommonModule],
  standalone: true,
  providers: [LibraryService]
})
export class NewbookComponent implements OnInit {
  @Input() isAdded:boolean = true;
  @Output() newBookEvent = new EventEmitter<Book>(); 
  bookForm: boolean = false;
  addbooktext: string = '+ Aggiungi un libro';
  errorMsg: string = "";
  constructor(private ls: LibraryService ) {}
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
    var formato: RegExp = /^[A-Z]\d{3}$/; //regex che matcha i 
    var title: HTMLInputElement = document.getElementById('nbtitolo') as HTMLInputElement;
    var author: HTMLInputElement = document.getElementById('nbautore') as HTMLInputElement;
    var position: HTMLInputElement = document.getElementById('nbposizione') as HTMLInputElement;
    //controllo che ritorna un errore se i campi sono vuoti
    if(title.value == "" || author.value == "" || position.value == ""){
      this.isAdded=false;
      this.errorMsg = "Errore: Compila tutti i campi";
      return;
    }
    //controllo che ritorna un errore se il formato della posizione non è corretta (la posizione matcha una regex)
    if(!formato.test(position.value)){
      this.errorMsg = "Posizione dev'essere una lettera maiuscola seguita da tre numeri! e.g: A261";
      return;
    }
    this.ls.getLibrary().subscribe({
      next: (x: AjaxResponse<any>) => {
        var booklist = JSON.parse(x.response);
        var library = new Library([]);
        library.adapt(booklist);
        //controllo che all'interno della libreria non ci sia già un libro a quella posizione
        if (library.books.some((el) => el.posizione == position.value)){
          this.errorMsg = "Questa posizione è già occupata da un altro libro";
        } else {
        this.errorMsg = "";
        var newBook: Book = new Book(title.value, author.value, position.value, undefined);
        this.newBookEvent.emit(newBook);
        title.value = "";
        author.value = "";
        position.value = "";
        }
    },
    error: (err) =>
      console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
    })
  }
  chiudiSuccess(){
    this.isAdded=false;
  }
}



