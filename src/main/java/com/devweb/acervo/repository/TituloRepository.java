package com.devweb.acervo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.acervo.model.Titulo;

public interface TituloRepository extends JpaRepository<Titulo, Long> {

}
