import {BookInterface, UserInterface} from './interfaces'

export class Book implements BookInterface{
  titolo: string;
  autore: string;
  posizione: string; //mi raccomando quando definisco il tipo "position" con la regex cambiare
  utenteNol: undefined;
  constructor(titolo: string, autore: string, posizione: string, utenteNol: undefined){
    this.titolo = titolo;
    this.autore = autore;
    this.posizione = posizione;
    this.utenteNol = undefined;
  }

}

export class User implements UserInterface{
  nome: string='';
  cognome: string='';
  userid: number = 1;
}

