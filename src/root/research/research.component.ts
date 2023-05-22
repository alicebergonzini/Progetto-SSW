import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Book} from '../classes'
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css'],
  standalone: true,
  imports: [ResultComponent]
})
export class ResearchComponent implements OnInit {
  @Output() searchBookEvent = new EventEmitter<string>(); 
  constructor() {}

  ngOnInit() {}
  cercaSubmit() {
    var cerca: HTMLInputElement = document.getElementById('cerca') as HTMLInputElement;
    var searchstring: string = cerca.value;
    this.searchBookEvent.emit(searchstring);
  }
}
