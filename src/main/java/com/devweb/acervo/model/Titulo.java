package com.devweb.acervo.model;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Titulo {

    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTitulo;

    @Column(length = 100, nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer ano;

    @Column(length = 100, nullable = false)
    private String sinopse;

    @Column(length = 100, nullable = false)
    private String categoria;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "tituloAtor", joinColumns = @JoinColumn(name = "titulo"), inverseJoinColumns = @JoinColumn(name = "atores"))
    private List<Ator> atores;

    @ManyToOne
    @JoinColumn(name = "diretor")
    private Diretor diretor;

    @ManyToOne
    @JoinColumn(name = "classe")
    private Classe classe;

    public Titulo() {
    }

    public Titulo(String nome, Integer ano, String sinopse, String categoria, Diretor diretor, Classe classe) {
        this.nome = nome;
        this.ano = ano;
        this.sinopse = sinopse;
        this.categoria = categoria;
        this.diretor = diretor;
        this.classe = classe;
        this.atores = new ArrayList<Ator>();
    }

    public Titulo(Long idTitulo, String nome, Integer ano, String sinopse, String categoria) {
        this.idTitulo = idTitulo;
        this.nome = nome;
        this.ano = ano;
        this.sinopse = sinopse;
        this.categoria = categoria;
        this.atores = new ArrayList<Ator>();
    }

}
