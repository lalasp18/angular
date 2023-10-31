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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/ator")
@AllArgsConstructor
public class AtorController {

    @Autowired
    private final AtorService atServ;

    @PostMapping("/criar")
    @Operation(description = "Dado o nome, cadastra um novo ator.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o ator seja incluído com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Ator salvarAtor(@RequestBody Ator grava) {
        return atServ.saveAll(grava);

    }

    @PutMapping("/editar")
    @Operation(description = "Dado o nome, o ator é editado.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o ator seja editado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Ator editarAtor(@RequestBody Ator grava) throws RelationTypeNotFoundException {
        return atServ.editAll(grava);

    }

    @GetMapping("/listar")
    @Operation (description="Retorna todos os atores cadastrados.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o ator seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Ator> listarAtor() {
        return atServ.listAll();
    }

    @GetMapping("/listar/{id}")
    @Operation (description="Retorna o ator cadastrado por id.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o ator ID seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Ator pegarIdAtor(@PathVariable Long id) throws RelationTypeNotFoundException {
        return atServ.listId(id);

    }

    @DeleteMapping("/deletar/{id}")
    @Operation(description = "Dado o id, deleta o ator.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o ator seja deletado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public ResponseEntity<String> deletarAtor(@PathVariable Long id) {
        try {
            atServ.deleteId(id);
            return ResponseEntity.ok("Ator deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
