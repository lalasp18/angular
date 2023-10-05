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

import com.devweb.acervo.model.Diretor;
import com.devweb.acervo.service.DiretorService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/diretor")
@AllArgsConstructor
public class DiretorController {

    @Autowired
    private final DiretorService dirServ;

    @PostMapping("/criar")
    public Diretor salvarDiretor(@RequestBody Diretor grava) throws RelationTypeNotFoundException {
        return dirServ.saveAll(grava);

    }

    @PutMapping("/editar")
    public Diretor editarDiretor(@RequestBody Diretor grava) throws RelationTypeNotFoundException {
        return dirServ.editAll(grava);

    }

    @GetMapping("/listar")
    public List<Diretor> listarAtor() {
        return dirServ.listAll();
    }

    @GetMapping("/listar/{id}")
    public Diretor pegarId(@PathVariable Long id) throws RelationTypeNotFoundException {
        return dirServ.listId(id);

    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<String> deletarDiretor(@PathVariable Long id) {
        try {
            dirServ.deleteId(id);
            return ResponseEntity.ok("Diretor deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
