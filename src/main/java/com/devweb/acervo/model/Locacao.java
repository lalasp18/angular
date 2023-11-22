package com.devweb.acervo.model;

import java.sql.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @Column(nullable = true)
    private Date dtDevolucaoEfetiva;

    @Column(nullable = false)
    private Float valorCobrado;

    @Column(nullable = true)
    private Float multaCobrada;

    @ManyToOne
    @JoinColumn(name = "item")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "cliente", referencedColumnName = "numInscricao")
    private Cliente cliente;

}
