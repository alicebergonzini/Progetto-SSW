import { Interfaces } from './interfaces';

//possibilmente definire un tipo di stringa che matchi una data espressione regolare

//classe per una singola unità della Libreria, un libro
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

//classe per l'insieme di libri, quindi la libreria
export class Library {
  books: Array<Book>;
  constructor(books: Array<Book>) {
    this.books = books;
  }
  addBook(book: Book){
    this.books.push(book);
  }
  deleteBook(book: Book){
    this.books = this.books.filter((element) => element.posizione != book.posizione);
  }
  adapt(booklist: Book[]){
    this.books = booklist.map((el: Book) => new Book(el.titolo, el.autore, el.posizione, el.utenteNol))
  }
  loanBook(book:Book, user:User){
    this.books.map((element)=>{
      if(element.posizione == book.posizione){
        element.loan(user);
      }
    });
  }
  returnBook(book: Book){
    this.books.map((element)=>{
      if(element.posizione == book.posizione){
        element.ret();
      }
    })
  }
}

//classe per l'utente 
export class User {
  nome: string;
  cognome: string;
  constructor(nome: string, cognome: string) {
    this.nome = nome;
    this.cognome = cognome;
  }
}
