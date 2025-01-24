import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PrenotazioneService } from '../prenotazione/prenotazione.service';
import { Prenotazione } from '../prenotazione/prenotazione.model';
import { CorsiService } from '../corsi/corsi.service';
import { Corsi } from '../corsi/corsi.model';

@Component({
  selector: 'app-amministrazione',
  imports: [],
  templateUrl: './amministrazione.component.html',
  styleUrl: './amministrazione.component.css'
})
export class AmministrazioneComponent implements OnInit {

  corsiPren = signal<Prenotazione[] | undefined>(undefined);
  corsi = signal<Corsi[] | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  private prenotazioneService = inject(PrenotazioneService);
  private corsiService = inject(CorsiService);

  ngOnInit(): void {
        
    const subscription = this.prenotazioneService.loadPrenotazioni()
        .subscribe({
          next: (resData) => {
            this.corsiPren.set(resData);
          }, 
        })

    const subscription2 = this.corsiService.loadCorsi()
    .subscribe({
      next: (data) => {
        this.corsi.set(data);
      }, 
    })
    
    this.destroyRef.onDestroy(()=>{
          subscription.unsubscribe();
        }
        )
    
    this.destroyRef.onDestroy(()=>{
      subscription2.unsubscribe();
    }
    )
  }

  onDelete(corso: Corsi){
    this.corsiService.deleteCorso(corso).subscribe({
      next: (resData=>{
        console.log("Stai eliminando", resData);
      })
    })
    this.corsiService.deletePreferito(corso).subscribe({
      next: (resData=>{
        console.log("Stai eliminando", resData);
      })
    })
  }
}
