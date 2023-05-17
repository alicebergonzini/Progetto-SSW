import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class NewbookComponent implements OnInit {
  bookForm: boolean = false;
  addbooktext: string = "+ Aggiungi un libro";
  constructor() { }

  ngOnInit() {
  }
  showForm(){
    this.bookForm = true;
    this.addbooktext = "- Nascondi";
  }

}