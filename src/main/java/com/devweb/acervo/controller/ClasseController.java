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
        return clasServ.saveAll(grava);

    }

    @PutMapping("/editar")
    public Classe editarClasse(@RequestBody Classe grava) throws RelationTypeNotFoundException {
        return clasServ.editAll(grava);

    }

    @GetMapping
    public List<Classe> listarClasse() {
        return clasServ.listAll();
    }

    @GetMapping("/{id}")
    public Classe pegarIdClasse(@PathVariable Long id) throws RelationTypeNotFoundException {
        return clasServ.listId(id);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarClasse(@PathVariable Long id) {
        try {
            clasServ.deleteId(id);
            return ResponseEntity.ok("Classe deletada com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
