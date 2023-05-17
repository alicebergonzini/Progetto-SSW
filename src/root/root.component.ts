import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component'
import {ResearchComponent} from './research/research.component'
import { NewbookComponent } from './newbook/newbook.component';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [CommonModule, HeaderComponent, ResearchComponent, NewbookComponent],
  standalone: true
})
export class RootComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

