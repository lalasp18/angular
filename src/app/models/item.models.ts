import { Titulo } from "./titulo.models";

export interface Item {
    idItem: number;
    numSerie: number;
    dtAquisicao: Date;
    tipoItem: string;
    titulo: Titulo;
}