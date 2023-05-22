import { Component, Input, OnInit } from '@angular/core'; 
import {Book} from '../classes'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true
})
export class ResultComponent implements OnInit {
  //inizializzo perché mi obbliga a farlo; è corretto? 
  @Input() book_result: Book = new Book("", "", "", undefined);
  status: string = ""; 
  constructor() { }

  ngOnInit() {
    this.status =  this.book_result.utenteNol === undefined ? "Disponibile" : "Noleggiato";
  }

  

}