import { Component, Input, EventEmitter, Output } from '@angular/core';
import {Book, User} from '../classes'

@Component({
  selector: 'app-noleggio',
  templateUrl: './noleggio.component.html',
  styleUrls: ['./noleggio.component.css'],
  standalone: true
})
export class NoleggioComponent  {
  @Input() book: Book = new Book("", "", "", undefined);
  @Output() noleggiaEvent = new EventEmitter<User>(); 
  inputnome: string = this.book.posizione + "Nome"
  inputcognome: string = this.book.posizione + "Cognome"
  //metodo che emette al componente padre (result) l'utente prestatario
  noleggia(){
    var name: HTMLInputElement = document.getElementById(this.inputnome) as HTMLInputElement;
    var surname: HTMLInputElement = document.getElementById(this.inputcognome) as HTMLInputElement;
    if(name.value != "" && surname.value != ""){
      this.noleggiaEvent.emit(new User(name.value, surname.value));
    }
  }
}