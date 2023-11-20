package com.devweb.acervo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devweb.acervo.model.Dependente;

public interface DependenteRepository extends JpaRepository<Dependente, Long> {

    @Query(value ="SELECT c.* FROM cliente c INNER JOIN dependente d ON c.num_inscricao = d.num_inscricao WHERE not exists (SELECT c.* FROM socio_dependentes sd WHERE c.estah_ativo = true and d.num_inscricao = sd.dependentes) and c.estah_ativo = true", nativeQuery = true)
    List<Dependente> findByDependentesOption();

    @Query(value ="SELECT c.* FROM cliente c INNER JOIN dependente d ON c.num_inscricao = d.num_inscricao WHERE c.estah_ativo = true", nativeQuery = true)
    List<Dependente> findAllByDependentesAtivos();

    @Query(value ="SELECT c.* FROM cliente c INNER JOIN dependente d ON c.num_inscricao = d.num_inscricao WHERE c.estah_ativo = false", nativeQuery = true)
    List<Dependente> findAllByDependentesInativos();
}
