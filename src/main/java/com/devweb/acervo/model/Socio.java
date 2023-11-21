package com.devweb.acervo.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Socio {

    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numInscricao;
    
    @Column(length = 100, nullable = false)
    private String nome;
    
    @Column(nullable = false)
    private Date dtNascimento;
    
    @Column(length = 20, nullable = false)
    private String sexo;
    
    @Column(nullable = false)
    private boolean estahAtivo;

    @Column(nullable = false)
    @Lob
    private String imagem;
    
    @Column(length = 20, nullable = false)
    private String cpf;
    
    @Column(length = 100, nullable = false)
    private String endereco;
    
    @Column(length = 20, nullable = false)
    private String tel;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @Column
    private List<Dependente> dependentes = new ArrayList<>();
    
    public Socio () {}

    public Socio (Long numInscricao, String nome, Date dtNascimento, String sexo, boolean estahAtivo, String imagem, String cpf, String endereco, String tel) {
        this.numInscricao = numInscricao;
        this.nome = nome;
        this.dtNascimento = dtNascimento;
        this.sexo = sexo;
        this.estahAtivo = estahAtivo;
        this.imagem = imagem;
        this.cpf = cpf;
        this.endereco = endereco;
        this.tel = tel;
    }
}
