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
  //inizializzo perché mi obbliga a farlo; è corretto? 
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
  checkStatus(){
    this.status =  this.book_result.utenteNol === undefined ? "Disponibile" : "Noleggiato";
    this.isDisponibile =  this.book_result.utenteNol != undefined ? false: true;
  }
  onDelete(){
    this.deleteEvent.emit(this.book_result);
  }
  openNoleggia(){
    this.noleggiando = true;
    var div_result: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement; 
    div_result.style.height = "210px";
  }
  chiudiNoleggia(){
    this.noleggiando = false;
    var div_result: HTMLDivElement = document.getElementById(this.id) as HTMLDivElement; 
    div_result.style.height = "110px";
  }
  makeNoleggio(user: User){
    this.ls.getLibrary().subscribe({
      next: (x: AjaxResponse<any>) => {
      var booklist = JSON.parse(x.response);
      this.library.adapt(booklist);
      this.library.loanBook(this.book_result, user);
      this.book_result.loan(user);
      /*
      this.library.books.map((element)=>{
        if(element.posizione == this.book_result.posizione){
          console.log(element);
          element.loan(user);
        }
      this.checkStatus();
      ); */
      //this.book_result.loan(user);
      console.log(this.book_result);
      this.ls.setLibrary(this.library.books).subscribe({
        next: (x: AjaxResponse<any>) => {
          this.chiudiNoleggia();
          this.checkStatus();
          console.log(this.status);
        },
        error: (err) => console.error('Errore: ' + JSON.stringify(err)),
        });
      
      },
      error: (err) =>
        console.error('La richiesta ha dato un errore: ' + JSON.stringify(err)),
      });
  }
  returnBook(){
    if(confirm("Sicuro di voler restituire " + this.book_result.titolo + "?")){
      this.book_result.ret();
      this.checkStatus();
    }
  }
}