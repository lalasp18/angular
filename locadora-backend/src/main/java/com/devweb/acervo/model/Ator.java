package com.devweb.acervo.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Ator {

    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAtor;

    @Column(length = 100, nullable = false)
    private String nome;

    public Ator() {

    }

    public Ator(String nome) {
        this.nome = nome;
    }

    public Ator(Long idAtor, String nome) {
        this.idAtor = idAtor;
        this.nome = nome;
    }
}
