import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css'],
  standalone: true
})
export class ResearchComponent {
  @Output() searchBookEvent = new EventEmitter<string>(); 
  //metodo che emette al componente genitore (root) la stringa immessa nel campo di ricerca
  cercaSubmit() {
    var cerca: HTMLInputElement = document.getElementById('cerca') as HTMLInputElement;
    var searchstring: string = cerca.value;
    this.searchBookEvent.emit(searchstring);
  }
}
