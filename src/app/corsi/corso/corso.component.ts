import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Corsi } from '../corsi.model';
import { CorsiService } from '../corsi.service'; 

@Component({
  selector: 'app-corso',
  imports: [],
  templateUrl: './corso.component.html',
  styleUrls: ['./corso.component.css']
})
export class CorsoComponent {

  @Input() corso!: Corsi;
  @Output() corsoPrenotato = new EventEmitter();
  
  corsi: Corsi[] = [];
  corsiPreferiti: Corsi[] = [];
  constructor(private corsiService: CorsiService) {}

  ngOnInit() {
    // Carica tutti i corsi
    this.corsiService.loadCorsi().subscribe((data) => {
      this.corsi = data;
    });

    // Carica i preferiti
    this.corsiService.loadCorsiPreferiti().subscribe(() => {
      this.corsiPreferiti = this.corsiService.loadedCorsiPreferiti();
    });
  }

  preferito(corso: Corsi) {
    this.corsiService.onPreferito(corso).subscribe(() => {
      // Aggiorna i corsi preferiti dopo l'operazione
      this.corsiPreferiti = this.corsiService.loadedCorsiPreferiti();
    });
  }

  isPreferito(corso: Corsi): boolean {
    return this.corsiPreferiti.some((c) => c.id === corso.id);
  }

  onPrenota(){
    this.corsoPrenotato.emit(this.corso);
  }
}
