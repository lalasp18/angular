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

import com.devweb.acervo.model.Titulo;
import com.devweb.acervo.service.TituloService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/titulo-create")
@AllArgsConstructor
public class TituloController {

    @Autowired
    private final TituloService tituloServ;

    @PostMapping
    public Titulo salvarTitulo(@RequestBody Titulo grava) throws RelationTypeNotFoundException {
        return tituloServ.saveAll(grava);

    }

    @PutMapping("/editar")
    public Titulo editarTitulo(@RequestBody Titulo grava) throws RelationTypeNotFoundException {
        return tituloServ.editAll(grava);

    }

    @GetMapping
    public List<Titulo> listarTitulo() {
        return tituloServ.listAll();
    }

    @GetMapping("/{id}")
    public Titulo pegarIdTitulo(@PathVariable Long id) throws RelationTypeNotFoundException {
        return tituloServ.listId(id);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarTitulo(@PathVariable Long id) {
        try {
            tituloServ.deleteId(id);
            return ResponseEntity.ok("Título deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
