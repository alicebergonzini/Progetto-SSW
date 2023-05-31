import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Book} from '../classes'
import { CommonModule } from '@angular/common';
import { AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css'],
  standalone: true
})
export class ResearchComponent implements OnInit {
  @Output() searchBookEvent = new EventEmitter<string>(); 
  constructor() {}

  ngOnInit() {}
  //metodo che emette al componente genitore (root) la stringa immessa nel campo di ricerca
  cercaSubmit() {
    var cerca: HTMLInputElement = document.getElementById('cerca') as HTMLInputElement;
    var searchstring: string = cerca.value;
    this.searchBookEvent.emit(searchstring);
  }
}
