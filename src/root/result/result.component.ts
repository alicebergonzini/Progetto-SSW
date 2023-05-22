import { Component, Input, OnInit } from '@angular/core'; 
import {Book} from '../classes'

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  standalone: true
})
export class ResultComponent implements OnInit {
  //@Input() book_result: Book;
  constructor() { }

  ngOnInit() {
  }

}