package com.devweb.acervo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.acervo.model.Socio;

public interface SocioRepository extends JpaRepository<Socio, Long> {
    
}
