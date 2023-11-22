package com.devweb.acervo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.acervo.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
