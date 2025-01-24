import { Component, inject, Input, OnInit } from '@angular/core';
import { Corsi } from '../corsi/corsi.model';
import { PrenotazioneService } from './prenotazione.service';
import { Prenotazione } from './prenotazione.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-prenotazione',
  imports: [ReactiveFormsModule],
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css']
})
export class PrenotazioneComponent implements OnInit {

  @Input() corso!: Corsi;

  prenotazioneServizio = inject(PrenotazioneService);

  showToast: boolean = false;
  currentId: number = 1;

  constructor(private prenotazioneService: PrenotazioneService) {}

  form = new FormGroup({
    nome: new FormControl('', {
      validators: [ 
        Validators.minLength(1),
        Validators.required
      ],
    }),
    cognome: new FormControl('', {
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

    })
  });

  get isNomeValid(){
    return (this.form.controls.nome.touched && this.form.controls.nome.invalid)
  }

  get isCognomeValid(){
    return (this.form.controls.cognome.touched && this.form.controls.cognome.invalid)
  }

  get isEmailValid(){
    return (this.form.controls.email.touched && this.form.controls.email.invalid)
  }

  ngOnInit(): void {

      const savedId = localStorage.getItem('currentId');
      if (savedId) {
        this.currentId = parseInt(savedId, 10);
      }

      if(!this.corso){
          this.corso = {
            id: '',
            nome: '',
            descrizione: '',
            istruttore: {
              nome: '',
              email: '',
              img: '',
              descrizione: ''
            },
            durata: '',
            capacitaMassima: 0,
            immagine: ''
          }
      }
  }

  onSubmit() {
    if (this.corso) {

      console.log(this.form.value.nome);
      console.log(this.form.value.cognome);
      console.log(this.form.value.email);

      const prenotazione: Prenotazione = {
        id: this.currentId.toString(),
        nomeCorso: this.corso.nome,
        nome: this.form.value.nome,
        cognome: this.form.value.cognome,
        email: this.form.value.email
      };

      this.prenotazioneService.addCorsoPrenotato(prenotazione).subscribe({
        next: (response) => {
          console.log('Prenotazione effettuata:', response);
          // Chiudi il modale e resetta il form
          this.currentId++;
          localStorage.setItem('currentId', this.currentId.toString());
          this.resetForm();
        },
        error: (error) => {
          console.error('Errore durante la prenotazione:', error);
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
          }, 3000); // Nascondi il toast dopo 3 secondi
        }
      });
    } 
  }

  resetForm() {
    this.form.reset();
  }
}
