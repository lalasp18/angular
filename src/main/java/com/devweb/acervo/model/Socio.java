package com.devweb.acervo.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Socio extends Cliente {
    
    @Column(length = 20, nullable = false)
    private String cpf;
    
    @Column(length = 100, nullable = false)
    private String endereco;
    
    @Column(length = 20, nullable = false)
    private String tel;

    @OneToMany(cascade = CascadeType.REMOVE)
    private List<Dependente> dependentes;
    
    public Socio () {}
    
    public Socio (Long numInscricao, String nome, Date dtNascimento, String sexo, boolean estahAtivo, String cpf, String endereco, String tel) {
        super(numInscricao, nome, dtNascimento, sexo, estahAtivo);
        this.cpf = cpf;
        this.endereco = endereco;
        this.tel = tel;
    }
}
