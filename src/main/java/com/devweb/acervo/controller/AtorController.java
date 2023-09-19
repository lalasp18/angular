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
    public Ator salvarAtor(@RequestBody Ator grava) throws RelationTypeNotFoundException{
        Ator ator = atServ.saveAll(grava);
        
        return new Ator(ator.getIdAtor(), ator.getNome());
    }

    @PutMapping("/editar")
    public Ator editarAtor(@RequestBody Ator grava) throws RelationTypeNotFoundException{
        Ator ator = atServ.editAll(grava);
        
        return new Ator(ator.getIdAtor(), ator.getNome());
    }

    @GetMapping
    public List<Ator> listarAtor(){
        return atServ.listAll();
    }

    @GetMapping("/{id}")
    public Ator pegarIdAtor(@PathVariable Long id) throws RelationTypeNotFoundException {
        Ator ator = atServ.listId(id);
        
        return new Ator(ator.getIdAtor(), ator.getNome());
    }

    @DeleteMapping("/{id}")
    public void deletarAtor(@PathVariable Long id) throws RelationTypeNotFoundException{
        atServ.deleteId(id);
    }
}
