
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Corsi } from './corsi.model';
import { CorsiService } from './corsi.service';
import { CorsoComponent } from "./corso/corso.component";
import { PrenotazioneComponent } from '../prenotazione/prenotazione.component';

@Component({
  selector: 'app-corsi',
  imports: [CorsoComponent, PrenotazioneComponent],
  templateUrl: './corsi.component.html',
  styleUrl: './corsi.component.css'
})

export class CorsiComponent implements OnInit {
  
    corsi = signal<Corsi[] | undefined>(undefined);
    isFetching = signal(false);
    corsoSelezionato!: Corsi;

    private destroyRef = inject(DestroyRef);
    private corsiService = inject(CorsiService);

    ngOnInit(): void {
        
        const subscription = this.corsiService.loadCorsi()
            .subscribe({
              next: (resData) => {
                this.corsi.set(resData);
                this.isFetching.set(true);
              },
              complete: () => {
                this.isFetching.set(false);
              }
            })
        
        this.destroyRef.onDestroy(()=>{
              subscription.unsubscribe();
            }
            )
    }

    openModal(corso: Corsi){
        this.corsoSelezionato = corso;
    }
}
