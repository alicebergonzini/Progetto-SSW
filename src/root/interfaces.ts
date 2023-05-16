
//possibilmente definire un tipo di stringa che matchi una data espressione regolare

export interface BookInterface {
  titolo: string;
  autore: string;
  posizione: string;
  utenteNol: UserInterface|undefined;

}

export interface UserInterface{
  nome: string;
  cognome: string;
  userid: number;
}