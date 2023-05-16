import { Interfaces } from './interfaces';

//possibilmente definire un tipo di stringa che matchi una data espressione regolare

export class Book {
  titolo: string;
  autore: string;
  posizione: string; //mi raccomando quando definisco il tipo "position" con la regex cambiare
  utenteNol: User | undefined;
  constructor(
    titolo: string,
    autore: string,
    posizione: string,
    utenteNol: User | undefined
  ) {
    this.titolo = titolo;
    this.autore = autore;
    this.posizione = posizione;
    this.utenteNol = utenteNol;
  }
  loan(user: User) {
    this.utenteNol = user;
  }
  ret() {
    this.utenteNol = undefined;
  }
}

export class Library {
  books: Array<Book>;
  constructor(books: Array<Book>) {
    this.books = books;
  }
}

export class User {
  nome: string;
  cognome: string;
  userid: number;
  constructor(nome: string, cognome: string, userid: number) {
    this.nome = nome;
    this.cognome = cognome;
    this.userid = userid;
  }
}
