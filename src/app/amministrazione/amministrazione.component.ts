import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PrenotazioneService } from '../prenotazione/prenotazione.service';
import { Prenotazione } from '../prenotazione/prenotazione.model';
import { CorsiService } from '../corsi/corsi.service';
import { Corsi } from '../corsi/corsi.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-amministrazione',
  imports: [ReactiveFormsModule],
  templateUrl: './amministrazione.component.html',
  styleUrl: './amministrazione.component.css'
})
export class AmministrazioneComponent implements OnInit {

  corsiPren = signal<Prenotazione[] | undefined>(undefined);
  corsi = signal<Corsi[] | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  private prenotazioneService = inject(PrenotazioneService);
  private corsiService = inject(CorsiService);

  currentId: number = 11;

  form = new FormGroup({
      nome: new FormControl('', {
        validators: [ 
          Validators.minLength(1),
          Validators.required
        ],
      }),
      descrizione: new FormControl('', {
        validators: [ 
          Validators.minLength(1),
          Validators.required
        ],
      }),
      durata: new FormControl('', {
        validators: [ 
          Validators.min(1),
          Validators.max(3),
          Validators.required
        ],
      }),
      capacita: new FormControl('', {
        validators: [ 
          Validators.min(1),
          Validators.max(30),
          Validators.required
        ],
      }),
      nomeIstruttore: new FormControl('', {
        validators: [ 
          Validators.minLength(1),
          Validators.required
        ],
      }),
      email: new FormControl('', {
        validators: [
          Validators.email, 
          Validators.required
        ]
      }),
      img: new FormControl('', {
        validators: [ 
          Validators.required
        ],
      }),
      descrizioneIstruttore: new FormControl('', {
        validators: [ 
          Validators.minLength(1),
          Validators.required
        ],
      }),
    });

  ngOnInit(): void {

    const savedId = localStorage.getItem('currentId');
      if (savedId) {
        this.currentId = parseInt(savedId, 10);
      }
        
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

  onSubmit(){
    

      const aggiungiCorso: Corsi = {
        id: this.currentId.toString(),
        nome: this.form.value.nome!,
        descrizione: this.form.value.descrizione!,
        istruttore: {
          nome: this.form.value.nomeIstruttore!,
          email: this.form.value.email!,
          img: this.form.value.img!,
          descrizione: this.form.value.descrizioneIstruttore!,
        },
        durata: this.form.value.durata!,
        capacitaMassima: Number(this.form.value.capacita!) 
      };

      this.corsiService.addCorso(aggiungiCorso).subscribe({
        next: (response) => {
          console.log("Corso aggiunto", response);
          this.currentId++;
          localStorage.setItem('currentId', this.currentId.toString());
          this.resetForm();
        },
        error: (error) => {
          console.error("Errore durante l'inserimento del corso:", error);
        }
      });
  }

  resetForm() {
    this.form.reset();
  }
}
