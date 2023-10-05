package com.devweb.acervo.controller;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devweb.acervo.model.Item;
import com.devweb.acervo.service.ItemService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/item")
@AllArgsConstructor
public class ItemController {

    @Autowired
    private final ItemService itemServ;

    @PostMapping("/criar")
    public Item salvarItem(@RequestBody Item grava) throws RelationTypeNotFoundException {
        return itemServ.saveAll(grava);

    }

    @PutMapping("/editar")
    public Item editarItem(@RequestBody Item grava) throws RelationTypeNotFoundException {
        return itemServ.editAll(grava);

    }

    @GetMapping("/listar")
    public List<Item> listarItem() {
        return itemServ.listAll();
    }

    @GetMapping("/listar/{id}")
    public Item pegarIdItem(@PathVariable Long id) throws RelationTypeNotFoundException {
        return itemServ.listId(id);

    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarItem(@PathVariable Long id) {
        try {
            itemServ.deleteId(id);
            return ResponseEntity.ok("Item deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
