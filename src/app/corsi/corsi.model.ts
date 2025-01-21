export interface Corsi{
    id: string,
    nome: string,
    descrizione: string,
    istruttore: {
        nome: string,
        email: string,
        img: string,
    },
    durata: string,
    capacitaMassima: number,
    immagine: string,
}