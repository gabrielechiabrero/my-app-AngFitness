import { Component, input, Input} from '@angular/core';
import { Corsi } from '../corsi.model';

@Component({
  selector: 'app-corso',
  imports: [],
  templateUrl: './corso.component.html',
  styleUrl: './corso.component.css'
})
export class CorsoComponent {

  corso = input.required<Corsi>();

    
}
