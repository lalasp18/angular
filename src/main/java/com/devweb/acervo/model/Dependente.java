package com.devweb.acervo.model;

import java.sql.Date;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
// @Table(name = "dependente")
// @Inheritance(strategy = InheritanceType.SINGLE_TABLE)
// @DiscriminatorColumn(name = "tipo_cliente", discriminatorType = DiscriminatorType.STRING)
public class Dependente extends Cliente {
    public Dependente() {}

    public Dependente (Long numInscricao, String nome, Date dtNascimento, String sexo, boolean estahAtivo) {
        super(numInscricao, nome, dtNascimento, sexo, estahAtivo);
    }
}
