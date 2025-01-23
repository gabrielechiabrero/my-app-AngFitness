import { Component, input, Input } from '@angular/core';
import { Corsi } from '../corsi/corsi.model';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css']
})
export class PrenotazioneComponent {

  @Input() corso!: Corsi;
}
