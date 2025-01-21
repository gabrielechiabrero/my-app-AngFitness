import { Component, inject, signal } from '@angular/core';
import { IstruttoreComponent } from './istruttore/istruttore.component';
import { Corsi } from '../corsi/corsi.model';
import { CorsiService } from '../corsi/corsi.service';

@Component({
  selector: 'app-chisiamo',
  imports: [IstruttoreComponent],
  templateUrl: './chisiamo.component.html',
  styleUrl: './chisiamo.component.css'
})
export class ChisiamoComponent {

    corsi = signal<Corsi[] | undefined>(undefined);

    private corsiService = inject(CorsiService);

    ngOnInit(): void {
        
      const subscription = this.corsiService.loadCorsi()
          .subscribe({
            next: (resData) => {
              this.corsi.set(resData);
            }
          })
      
  }
}
