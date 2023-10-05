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

import com.devweb.acervo.model.Ator;
import com.devweb.acervo.service.AtorService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/ator")
@AllArgsConstructor
public class AtorController {

    @Autowired
    private final AtorService atServ;

    @PostMapping("/criar")
    public Ator salvarAtor(@RequestBody Ator grava) throws RelationTypeNotFoundException {
        return atServ.saveAll(grava);

    }

    @PutMapping("/editar/{id}")
    public Ator editarAtor(@RequestBody Ator grava) throws RelationTypeNotFoundException {
        return atServ.editAll(grava);

    }

    @GetMapping("/listar")
    public List<Ator> listarAtor() {
        return atServ.listAll();
    }

    @GetMapping("/listar/{id}")
    public Ator pegarIdAtor(@PathVariable Long id) throws RelationTypeNotFoundException {
        return atServ.listId(id);

    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarAtor(@PathVariable Long id) {
        try {
            atServ.deleteId(id);
            return ResponseEntity.ok("Ator deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
