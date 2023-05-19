import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class NewbookComponent implements OnInit {
  bookForm: boolean = false;
  addbooktext: string = '+ Aggiungi un libro';
  constructor() {}
  ngOnInit() {}
  showForm() {
    if (this.bookForm == false) {
      this.bookForm = true;
      this.addbooktext = '- Nascondi';
    } else {
      this.bookForm = false;
      this.addbooktext = '+ Aggiungi un libro';
    }
  }
  onSubmit()  {
    var author: HTMLInputElement = document.getElementById('nb_author') as HTMLInputElement;
    var autore: string = author.value;
    console.log(autore);
  }
   
}



