package com.devweb.acervo.model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.actuate.autoconfigure.metrics.MetricsProperties.Web.Client;

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
public class Socio extends Cliente {

    @Column(length = 20, nullable = false)
    private String cpf;

    @Column(length = 100, nullable = false)
    private String endereco;

    @Column(length = 20, nullable = false)
    private String tel;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @Column
    private List<Dependente> dependentes = new ArrayList<>();

}