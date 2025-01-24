import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { Prenotazione } from "./prenotazione.model";

@Injectable({
    providedIn: "root"
})
export class PrenotazioneService {
    private httpClient = inject(HttpClient);
    private corsiPrenotati = signal<Prenotazione[]>([]);

    private fetchCorsiPrenotati(url: string, errorMessage: string){
        return this.httpClient.get<Prenotazione[]>(url)
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

    loadPrenotazioni(){
        return this.fetchCorsiPrenotati('http://localhost:3000/corsiPrenotati', "Qualcosa è andato storto")
    }


    addCorsoPrenotato(corsoPren: Prenotazione){
        this.corsiPrenotati.update( prevCorso => [...prevCorso, corsoPren]);
        return this.httpClient.post('http://localhost:3000/corsiPrenotati', corsoPren)
    }
}