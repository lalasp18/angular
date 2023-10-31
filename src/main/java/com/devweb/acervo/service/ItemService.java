package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.acervo.model.Item;
import com.devweb.acervo.repository.ItemRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Service
@Tag(name = "ItemService", description = "Fornece serviços web REST para acesso e manipulação de dados de itens.")
public class ItemService {

    @Autowired
    private ItemRepository itemRepo;

    public Item saveAll(Item item) {
        return itemRepo.save(item);
    }

    public Item editAll(Item item) throws RelationTypeNotFoundException {
        Item editado = itemRepo.findById(item.getIdItem())
                .orElseThrow(
                        () -> new RelationTypeNotFoundException("Item não existe com id :" + item.getTipoItem()));

        editado.setIdItem(item.getIdItem());
        editado.setNumSerie(item.getNumSerie());
        editado.setDtAquisicao(item.getDtAquisicao());
        editado.setTipoItem(item.getTipoItem());
        editado.setTitulo(item.getTitulo());
        return itemRepo.save(editado);
    }

    public List<Item> listAll() {
        return itemRepo.findAll();
    }

    public Item listId(Long idItem) throws RelationTypeNotFoundException {
        return itemRepo.findById(idItem)
                .orElseThrow(() -> new RelationTypeNotFoundException("Item não existe com id :" + idItem));
    }

    public void deleteId(Long idItem) throws RelationTypeNotFoundException {
        Item item = itemRepo.findById(idItem)
                .orElseThrow(() -> new RelationTypeNotFoundException("Item não existe com id :" + idItem));
        itemRepo.delete(item);
    }
}