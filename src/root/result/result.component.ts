import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import {Book, User} from '../classes';
import { NoleggioComponent } from '../noleggio/noleggio.component';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true,
  imports: [CommonModule, NoleggioComponent]
})
export class ResultComponent implements OnInit {
  //inizializzo perché mi obbliga a farlo; è corretto? 
  @Input() book_result: Book = new Book("", "", "", undefined);
  @Input() id: string = "";
  @Output() deleteEvent = new EventEmitter<Book>(); 
  status: string = ""; 
  isDisponibile: boolean = true;
  noleggiando: boolean = false;
  
  constructor() { }

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
    this.book_result.loan(user);
    this.chiudiNoleggia();
    this.checkStatus();
  }
  returnBook(){
    if(confirm("Sicuro di voler restituire " + this.book_result.titolo + "?")){
      this.book_result.ret();
      this.checkStatus();
    }
  }
}