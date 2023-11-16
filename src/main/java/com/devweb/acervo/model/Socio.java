package com.devweb.acervo.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
// @Table(name = "socio")
// @Inheritance(strategy = InheritanceType.SINGLE_TABLE)
// @DiscriminatorColumn(name = "tipo_cliente", discriminatorType = DiscriminatorType.STRING)
public class Socio extends Cliente {
    
    @Column(length = 20, nullable = false)
    private String cpf;
    
    @Column(length = 100, nullable = false)
    private String endereco;
    
    @Column(length = 20, nullable = false)
    private String tel;

    @OneToMany
    @Column(nullable = true)
    private List<Dependente> dependentes;
    
    public Socio () {}

    public Socio (Long numInscricao, String nome, Date dtNascimento, String sexo, boolean estahAtivo, String cpf, String endereco, String tel) {
        super(numInscricao, nome, dtNascimento, sexo, estahAtivo);
        this.cpf = cpf;
        this.endereco = endereco;
        this.tel = tel;
    }
}
