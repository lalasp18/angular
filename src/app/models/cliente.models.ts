export interface Dependente {
    numInscricao: number;
    nome: string;
    dtNascimento: Date;
    sexo: string;
    estahAtivo: boolean;
    imagem: string;
}

export interface Socio {
    numInscricao: number;
    nome: string;
    dtNascimento: Date;
    sexo: string;
    estahAtivo: boolean;
    imagem: string;
    cpf: string;
    endereco: string;
    tel: string;
    dependentes?: Array<Dependente>;
}