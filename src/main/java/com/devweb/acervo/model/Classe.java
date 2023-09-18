package com.devweb.acervo.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Classe {

    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClasse;

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(nullable = false)
    private Number valor;

    @Column(nullable = false)
    private Date prazoDevolucao;

    public Classe() {
    }

    public Classe(String nome, Number valor, Date prazoDevolucao) {
        this.nome = nome;
        this.valor = valor;
        this.prazoDevolucao = prazoDevolucao;
    }

    public Classe(Long idClasse, String nome, Number valor, Date prazoDevolucao) {
        this.idClasse = idClasse;
        this.nome = nome;
        this.valor = valor;
        this.prazoDevolucao = prazoDevolucao;
    }
}
