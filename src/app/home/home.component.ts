import { Component, inject, OnInit } from '@angular/core';
import { CorsiService } from '../corsi/corsi.service';
import { CorsoComponent } from '../corsi/corso/corso.component';
import { Corsi } from '../corsi/corsi.model';
import { Router } from '@angular/router';
import { PrenotazioneComponent } from "../prenotazione/prenotazione.component";

@Component({
  selector: 'app-home',
  imports: [CorsoComponent, PrenotazioneComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  private corsiService = inject(CorsiService);
  corsi = this.corsiService.loadedCorsiPreferiti;
  corsoSelezionato!: Corsi;

  constructor(private router: Router) {}

  ngOnInit(): void {
      console.log(this.corsiService.loadCorsiPreferiti()
        .subscribe({
            complete: () => {
              console.log("Caricamento completato")
            }
        }));

        
  }

  removeCorso(corso: Corsi){
    this.corsiService.deletePreferito(corso).subscribe({
      next: (resData=>{
        console.log("Stai eliminando", resData);
      })
    })
  }

  moveToCorsi(){
    this.router.navigate(['/corsi']);
  }

  openModal(corso: Corsi){
    this.corsoSelezionato = corso;
  }
}
