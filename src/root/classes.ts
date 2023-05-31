import { Interfaces } from './interfaces';

//possibilmente definire un tipo di stringa che matchi una data espressione regolare

//classe per una singola unità della Libreria, un libro
export class Book {
  titolo: string;
  autore: string;
  posizione: string; 
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
  //viene associato alla proprietà 'utenteNol' l'utente prestatario (che è un oggetto di tipo User)
  loan(user: User) {
    this.utenteNol = user;
  }
  //la proprietà dell'utente prestatario torna a essere undefined
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
  //aggiunge un libro all'archivio
  addBook(book: Book){
    this.books.push(book);
  }
  //elimina un libro dall'archivio
  deleteBook(book: Book){
    this.books = this.books.filter((element) => element.posizione != book.posizione);
  }
  //adatta la lista di oggetti di tipo "oggetto" e la trasforma in un array di oggetti di tipo "Book"
  adapt(booklist: Book[]){
    this.books = booklist.map((el) => new Book(el.titolo, el.autore, el.posizione, el.utenteNol))
  }
  //noleggia un libro a un utente 
  loanBook(book:Book, user:User){
    this.books.map((element)=>{
      if(element.posizione == book.posizione){
        element.loan(user);
      }
    });
  }
  //restituisce un libro
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
