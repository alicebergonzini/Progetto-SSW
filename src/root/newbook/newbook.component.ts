import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css'],
  imports: [CommonModule, /*FormsModule*/],
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
  /*
  submit()  {
    if (this.bookForm == true){
    const form: HTMLFormElement = document.getElementById('nb_form') as HTMLFormElement;
    let formdata = new FormData(form);
    const text = formdata.get('textInput') as string;
    console.log("hey");
    }
  }
  */
}


