package com.devweb.acervo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devweb.acervo.model.Dependente;
import com.devweb.acervo.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query(value = "select i.* from item i , locacao l where i.id_item = l.item", nativeQuery = true)
    List<Item> findAllItemInLocacao();

    @Query(value = "select i.* from item i where i.id_item not in (select i.id_item from locacao l where i.id_item = l.item and l.ativo = true)", nativeQuery = true)
    List<Item> findAllItemOutLocacao();

}
