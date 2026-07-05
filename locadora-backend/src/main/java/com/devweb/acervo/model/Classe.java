package com.devweb.acervo.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
    private Double valor;

    @Column(nullable = false)
    private Integer prazoDevolucao;

    public Classe() {

    }

    public Classe(String nome, Double valor, Integer prazoDevolucao) {
        this.nome = nome;
        this.valor = valor;
        this.prazoDevolucao = prazoDevolucao;
    }

    public Classe(Long idClasse, String nome, Double valor, Integer prazoDevolucao) {
        this.idClasse = idClasse;
        this.nome = nome;
        this.valor = valor;
        this.prazoDevolucao = prazoDevolucao;
    }
}
