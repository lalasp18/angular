package com.devweb.acervo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devweb.acervo.model.Titulo;

public interface TituloRepository extends JpaRepository<Titulo, Long> {

    @Query(value = "SELECT distinct t.* FROM titulo t , titulo_ator ta , ator a where a.id_ator =  ta.atores  and t.id_titulo = ta.titulo and UPPER(a.nome) like  UPPER(%:nomeator%)", nativeQuery = true)
    List<Titulo> findTituloAtor(@Param("nomeator") String nomeator);

    @Query(value = "SELECT distinct t.* FROM titulo t where t.nome like '%:nometitulo%'", nativeQuery = true)
    List<Titulo> findTituloNome(@Param("nometitulo") String nometitulo);

    @Query(value = "SELECT distinct t.* FROM titulo t where t.categoria like '%:categoria%'", nativeQuery = true)
    List<Titulo> findTituloCategoria(@Param("categoria") String categoria);

}
