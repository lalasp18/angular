package com.devweb.acervo.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
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
public class Locacao {

    @Id
    @Column(columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLocacao;

    @Column(nullable = false)
    private Date dtLocacao;

    @Column(nullable = false)
    private Date dtDevolucaoPrevista;

    @Column(nullable = false)
    private Date dtDevolucaoEfetiva;

    @Column(nullable = false)
    private Float valorCobrado;

    @Column(nullable = false)
    private Float multaCobrada;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "ItemLocacao", joinColumns = @JoinColumn(name = "item"), inverseJoinColumns = @JoinColumn(name = "itens"))
    private List<Item> itens;

    public Locacao() {

    }

    public Locacao(Date dtLocacao, Date dtDevolucaoPrevista, Date dtDevolucaoEfetiva, Float valorCobrado,
            Float multaCobrada) {

        this.dtLocacao = dtLocacao;
        this.dtDevolucaoPrevista = dtDevolucaoPrevista;
        this.dtDevolucaoEfetiva = dtDevolucaoEfetiva;
        this.valorCobrado = valorCobrado;
        this.multaCobrada = multaCobrada;
        this.itens = new ArrayList<Item>();
    }

    public Locacao(Long idLocacao, Date dtLocacao, Date dtDevolucaoPrevista, Date dtDevolucaoEfetiva,
            Float valorCobrado,
            Float multaCobrada) {

        this.idLocacao = idLocacao;
        this.dtLocacao = dtLocacao;
        this.dtDevolucaoPrevista = dtDevolucaoPrevista;
        this.dtDevolucaoEfetiva = dtDevolucaoEfetiva;
        this.valorCobrado = valorCobrado;
        this.multaCobrada = multaCobrada;
        this.itens = new ArrayList<Item>();
    }

}
