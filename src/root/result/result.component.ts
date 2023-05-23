import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'; 
import {Book} from '../classes';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResultComponent implements OnInit {
  //inizializzo perché mi obbliga a farlo; è corretto? 
  @Input() book_result: Book = new Book("", "", "", undefined);
  @Output() deleteEvent = new EventEmitter<Book>(); 
  status: string = ""; 
  isDisponibile: boolean = true;
  constructor() { }

  ngOnInit() {
    this.status =  this.book_result.utenteNol === undefined ? "Disponibile" : "Noleggiato";
    this.isDisponibile =  this.book_result.utenteNol != undefined ? false: true;
  }
  onDelete(){
    this.deleteEvent.emit(this.book_result);
  }
  
}