import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import { Library, Book, User} from '../classes';
import { LibraryService } from '../library.service';
import { NoleggioComponent } from '../noleggio/noleggio.component';
import { ajax, AjaxResponse } from 'rxjs/ajax';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true,
  imports: [CommonModule, NoleggioComponent],
  providers: [LibraryService]
})
export class ResultComponent implements OnInit {
  @Input() book_result: Book = new Book("", "", "", undefined);
  @Input() id: string = "";
  @Input() library: Library = new Library([]);
  @Output() deleteEvent = new EventEmitter<Book>(); 
  status: string = "";
  isDisponibile: boolean = true;
  noleggiando: boolean = false;
  
  constructor(private ls: LibraryService) { }

  ngOnInit() {
    this.checkStatus();
  }
  //metodo che definisce due proprietà in base alla disponibilità del libro
  checkStatus(){
    this.status =  this.book_result.utenteNol === undefined ? "Disponibile" : "Noleggiato";
    this.isDisponibile =  this.book_result.utenteNol != undefined ? false: true;
  }
  //metodo che emette l'istanza di libro al componente genitore(result) al click del pulsante Elimina
  onDelete(){
    this.deleteEvent.emit(this.book_result);
  }
  //metodo che aggiorna lo status di 'noleggiando' per mostrare la sezione con gli input per il noleggio
  openNoleggia(){
    this.noleggiando = true;
    var div_result: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement; 
    div_result.style.height = "210px";
  }
  //metodo che aggiorna lo status di 'noleggiando' per chiudere la sezione per il noleggio
  chiudiNoleggia(){
    this.noleggiando = false;
    var div_result: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement; 
    div_result.style.height = "110px";
  }
  //metodo ce fa una get per trovare il libro selezionato e poi fa una set con il libro noleggiato all'utente
  makeNoleggio(user: User){
    this.ls.getLibrary().subscribe({
      next: (x: AjaxResponse<any>) => {
      var booklist = JSON.parse(x.response);
      this.library.adapt(booklist);
      this.library.loanBook(this.book_result, user);
      this.book_result.loan(user);
      this.chiudiNoleggia();
      this.checkStatus();
      this.ls.setSub(this.library.books);
      },
      error: (err) =>
        console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
      });
  }
  returnBook(){
    if(confirm("Sicuro di voler restituire " + this.book_result.titolo + "?")){
      this.ls.getLibrary().subscribe({
        next: (x: AjaxResponse<any>) => {
          var booklist = JSON.parse(x.response);
          this.library.adapt(booklist);
          this.library.returnBook(this.book_result);
          this.book_result.ret();
          this.checkStatus();
          this.ls.setSub(this.library.books);
          },
          error: (err) =>
          console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
          });
        }
    }
}