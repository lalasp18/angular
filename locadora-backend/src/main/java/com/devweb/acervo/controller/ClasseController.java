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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/classe")
@AllArgsConstructor
public class ClasseController {

    @Autowired
    private final ClasseService clasServ;

    @PostMapping("/criar")
    @Operation(description = "Dado o nome, cadastra um nova classe.", responses = {
            @ApiResponse(responseCode = "200", description = "Caso a classe seja incluído com sucesso."),
            @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
            @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Classe salvarClasse(@RequestBody Classe grava) {
        return clasServ.saveAll(grava);

    }

    @PutMapping("/editar")
    @Operation(description = "Dado o nome, a classe é editada.", responses = {
            @ApiResponse(responseCode = "200", description = "Caso a classe seja editado com sucesso."),
            @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
            @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Classe editarClasse(@RequestBody Classe grava) throws RelationTypeNotFoundException {
        return clasServ.editAll(grava);

    }

    @GetMapping("/listar")
    @Operation(description = "Retorna todos os atores cadastrados.", responses = {
            @ApiResponse(responseCode = "200", description = "Caso a classe seja listado com sucesso."),
            @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
            @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Classe> listarClasse() {
        return clasServ.listAll();
    }

    @GetMapping("/listar/{id}")
    @Operation(description = "Retorna a classe cadastrado por id.", responses = {
            @ApiResponse(responseCode = "200", description = "Caso a classe ID seja listado com sucesso."),
            @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
            @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Classe pegarIdClasse(@PathVariable Long id) throws RelationTypeNotFoundException {
        return clasServ.listId(id);

    }

    @DeleteMapping("/deletar/{id}")
    @Operation(description = "Dado o id, deleta a classe.", responses = {
            @ApiResponse(responseCode = "200", description = "Caso a classe seja deletado com sucesso."),
            @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
            @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public ResponseEntity<String> deletarClasse(@PathVariable Long id) {
        try {
            clasServ.deleteId(id);
            return ResponseEntity.ok("Classe deletada com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
