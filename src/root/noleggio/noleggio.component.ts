import { Component,Input, OnInit } from '@angular/core';
import {Book} from '../classes'

@Component({
  selector: 'app-noleggio',
  templateUrl: './noleggio.component.html',
  styleUrls: ['./noleggio.component.css'],
  standalone: true
})
export class NoleggioComponent implements OnInit {
  @Input() book: Book = new Book("", "", "", undefined);
  inputnome: string = this.book.posizione + "Nome"
  inputcognome: string = this.book.posizione + "Cognome"
  constructor() { }

  ngOnInit() {
  }
  noleggia(){
    var name: HTMLInputElement = document.getElementById(this.inputnome) as HTMLInputElement;
    var surname: HTMLInputElement = document.getElementById(this.inputcognome) as HTMLInputElement;
    console.log(name.value+surname.value);
  }
}