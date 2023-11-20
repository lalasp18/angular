package com.devweb.acervo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devweb.acervo.model.Socio;

public interface SocioRepository extends JpaRepository<Socio, Long> {
    
    @Query(value ="SELECT c.*, s.* FROM cliente c INNER JOIN socio s ON c.num_inscricao = s.num_inscricao WHERE c.estah_ativo = true", nativeQuery = true)
    List<Socio> findAllBySocioAtivo();

    @Query(value ="SELECT c.*, s.* FROM cliente c INNER JOIN socio s ON c.num_inscricao = s.num_inscricao WHERE c.estah_ativo = false", nativeQuery = true)
    List<Socio> findAllBySocioInativo();
}
