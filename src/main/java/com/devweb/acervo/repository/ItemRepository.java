package com.devweb.acervo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.acervo.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {

}
