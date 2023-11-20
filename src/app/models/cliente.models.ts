export interface Cliente {
    numInscricao: number;
    nome: string;
    dtNascimento: Date;
    sexo: string;
    estahAtivo: boolean;
    imagem: string;
}

export interface Dependente extends Cliente {}

export interface Socio extends Cliente {
    cpf: string;
    endereco: string;
    tel: string;
    dependentes?: Array<Dependente>;
}