import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { Corsi } from "./corsi.model";

@Injectable({
    providedIn: "root"
})
export class CorsiService {
    private httpClient = inject(HttpClient);
    private corsiPreferiti = signal<Corsi[]>([]);

    private fetchCorsi(url: string, errorMessage: string){
        return this.httpClient.get<Corsi[]>(url)
            .pipe(
                catchError((error) => {
                    console.log(error);
                    return throwError(
                        () => {
                            new Error(errorMessage);
                        }
                    )
                })
            )
    }

    loadCorsi(){
        return this.fetchCorsi('http://localhost:3000/corsi', "Qualcosa è andato storto")
    }

    loadedCorsiPreferiti = this.corsiPreferiti.asReadonly();

    loadCorsiPreferiti(){
        return this.fetchCorsi('http://localhost:3000/corsiPreferiti', "Qualcosa è andato storto con i preferiti")
        .pipe(
          tap({
            next: (corsiPref) => {
              return this.corsiPreferiti.set(corsiPref);
            }
          })
        )
      }

    addCorsoPreferito(corso: Corsi){
        this.corsiPreferiti.update( prevCorso => [...prevCorso, corso]);
        return this.httpClient.post('http://localhost:3000/corsiPreferiti', corso)
    }

    deleteUser(corso: Corsi){
        this.corsiPreferiti.update(
          corsi => corsi.filter(c => c.id !== corso.id)
        )
        return this.httpClient.delete('http://localhost:3000/corsiPreferiti/' + corso.id);
    }
}