import { Ator } from "./ator.models";
import { Classe } from "./classe.models";
import { Diretor } from "./diretor.models";

export interface Titulo {
    idTitulo: number;
    nome: string;
    ano: number;
    sinopse: string;
    categoria: string;
    atores: Array<Ator>;
    diretor: Diretor;
    classe: Classe;
    imagem: string;
}