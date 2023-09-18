package com.devweb.acervo.controller;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devweb.acervo.model.Classe;
import com.devweb.acervo.service.ClasseService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/classe-create")
@AllArgsConstructor
public class ClasseController {

    @Autowired
    private final ClasseService clasServ;

    @PostMapping
    public Classe salvarClasse(@RequestBody Classe grava) throws RelationTypeNotFoundException {
        Classe classe = clasServ.saveAll(grava);

        return new Classe(classe.getIdClasse(), classe.getNome(), classe.getValor(), classe.getPrazoDevolucao());
    }

    @PostMapping("/editar")
    public Classe editarClasse(@RequestBody Classe grava) throws RelationTypeNotFoundException {
        Classe classe = clasServ.editAll(grava);

        return new Classe(classe.getIdClasse(), classe.getNome(), classe.getValor(), classe.getPrazoDevolucao());
    }

    @GetMapping
    public List<Classe> listarClasse() {
        return clasServ.listAll();
    }

    @GetMapping("/{id}")
    public Classe pegarIdClasse(@PathVariable Long id) throws RelationTypeNotFoundException {
        Classe classe = clasServ.listId(id);

        return new Classe(classe.getIdClasse(), classe.getNome(), classe.getValor(), classe.getPrazoDevolucao());
    }

    @DeleteMapping("/{id}")
    public void deletarClasse(@PathVariable Long id) throws RelationTypeNotFoundException {
        clasServ.deleteId(id);
    }
}
