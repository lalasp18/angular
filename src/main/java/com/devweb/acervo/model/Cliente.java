package com.devweb.acervo.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Lob;
import lombok.Data;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
// @Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Cliente {
    
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

    public Cliente () {}

    public Cliente (Long numInscricao, String nome, Date dtNascimento, String sexo, boolean estahAtivo, String imagem) {
        this.numInscricao = numInscricao;
        this.nome = nome;
        this.dtNascimento = dtNascimento;
        this.sexo = sexo;
        this.estahAtivo = estahAtivo;
        this.imagem = imagem;
    }
}
