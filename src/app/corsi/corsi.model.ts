export interface Corsi{
    id: string,
    nome: string,
    descrizione: string,
    istruttore: {
        nome: string,
        email: string,
        img: string,
        descrizione: string,
    },
    durata: string,
    capacitaMassima: number
}