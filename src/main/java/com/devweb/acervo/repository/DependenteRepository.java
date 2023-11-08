package com.devweb.acervo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.acervo.model.Dependente;

public interface DependenteRepository extends JpaRepository<Dependente, Long> {
    
}
