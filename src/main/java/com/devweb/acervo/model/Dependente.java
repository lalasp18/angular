package com.devweb.acervo.model;

import java.sql.Date;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class Dependente extends Cliente {
    public Dependente() {}

    public Dependente (Long numInscricao, String nome, Date dtNascimento, String sexo, boolean estahAtivo, String imagem) {
        super(numInscricao, nome, dtNascimento, sexo, estahAtivo, imagem);
    }
}
