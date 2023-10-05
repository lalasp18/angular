package com.devweb.acervo.controller;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/ator-create")
@AllArgsConstructor
public class AtorController {

    @Autowired
    private final AtorService atServ;

    @PostMapping
    public Ator salvarAtor(@RequestBody Ator grava) throws RelationTypeNotFoundException {
        return atServ.saveAll(grava);

    }

    @PutMapping("/editar")
    public Ator editarAtor(@RequestBody Ator grava) throws RelationTypeNotFoundException {
        return atServ.editAll(grava);

    }

    @GetMapping
    public List<Ator> listarAtor() {
        return atServ.listAll();
    }

    @GetMapping("/{id}")
    public Ator pegarIdAtor(@PathVariable Long id) throws RelationTypeNotFoundException {
        return atServ.listId(id);

    }

    @DeleteMapping("/{id}")
    public void deletarAtor(@PathVariable Long id) throws RelationTypeNotFoundException {
        atServ.deleteId(id);
    }
}
