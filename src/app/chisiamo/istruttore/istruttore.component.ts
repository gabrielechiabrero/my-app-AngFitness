import { Component, input } from '@angular/core';
import { Corsi } from '../../corsi/corsi.model';

@Component({
  selector: 'app-istruttore',
  imports: [],
  templateUrl: './istruttore.component.html',
  styleUrl: './istruttore.component.css'
})
export class IstruttoreComponent {

    corso = input.required<Corsi>();
}
