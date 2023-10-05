package com.devweb.acervo.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

import lombok.Data;

@Data
@Entity
public class Diretor {

    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDiretor;

    @Column(length = 100, nullable = false)
    private String nome;

    public Diretor() {
    }

    public Diretor(String nome) {
        this.nome = nome;
    }

    public Diretor(Long idDiretor, String nome) {
        this.idDiretor = idDiretor;
        this.nome = nome;
    }
}
