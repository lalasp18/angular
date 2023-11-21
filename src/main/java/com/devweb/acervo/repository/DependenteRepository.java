package com.devweb.acervo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devweb.acervo.model.Dependente;

public interface DependenteRepository extends JpaRepository<Dependente, Long> {

    @Query(value ="SELECT d.* FROM dependente d WHERE not exists (SELECT d.* FROM socio_dependentes sd WHERE d.estah_ativo = true and d.num_inscricao = sd.dependentes) and d.estah_ativo = true", nativeQuery = true)
    List<Dependente> findByDependentesOption();

    @Query(value ="SELECT d.* FROM dependente d WHERE d.estah_ativo = true", nativeQuery = true)
    List<Dependente> findAllByDependentesAtivos();

    @Query(value ="SELECT d.* FROM dependente d WHERE d.estah_ativo = false", nativeQuery = true)
    List<Dependente> findAllByDependentesInativos();
}
