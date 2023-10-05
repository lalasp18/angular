package com.devweb.acervo.model;

import java.sql.Date;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Item {

    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idItem;

    @Column(nullable = false)
    private Integer numSerie;

    @Column(nullable = false)
    private Date dtAquisicao;

    @Column(length = 100, nullable = false)
    private String tipoItem;

    @ManyToOne
    @JoinColumn(name = "titulo")
    private Titulo titulo;

    public Item() {
    }

    public Item(Integer numSerie, Date dtAquisicao, String tipoItem, Titulo titulo) {
        this.numSerie = numSerie;
        this.dtAquisicao = dtAquisicao;
        this.tipoItem = tipoItem;
        this.titulo = titulo;
    }

    public Item(Long idItem, Integer numSerie, Date dtAquisicao, String tipoItem, Titulo titulo) {
        this.idItem = idItem;
        this.numSerie = numSerie;
        this.dtAquisicao = dtAquisicao;
        this.tipoItem = tipoItem;
        this.titulo = titulo;

    }
}
