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

import com.devweb.acervo.model.Dependente;
import com.devweb.acervo.service.DependenteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/dependente")
@AllArgsConstructor
public class DependenteController {

    @Autowired
    private final DependenteService dependenteService;

    @PostMapping("/criar")
    @Operation(description = "Dado o nome, cadastra um novo dependente.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o dependente seja incluído com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Dependente salvarDependente(@RequestBody Dependente grava) {
        return dependenteService.saveDependente(grava);

    }

    @PutMapping("/editar")
    @Operation(description = "Dado o nome, o dependente é editado.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o dependente seja editado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Dependente editarDependente(@RequestBody Dependente grava) throws RelationTypeNotFoundException {
        return dependenteService.editDependente(grava);

    }

    @GetMapping("/listar")
    @Operation (description="Retorna todos os dependentees cadastrados.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o dependente seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Dependente> listarDependente() {
        return dependenteService.listAllDependentes();
    }

    @GetMapping("/listar/ativo")
    @Operation (description="Retorna todos os dependentees cadastrados.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o dependente seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Dependente> listarDependenteAtivo() {
        return dependenteService.listAllDependentesQuery2();
    }

    @GetMapping("/listar/inativo")
    @Operation (description="Retorna todos os dependentees cadastrados.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o dependente seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Dependente> listarDependenteInativo() {
        return dependenteService.listAllDependentesQuery3();
    }

    @GetMapping("/listar/{id}")
    @Operation (description="Retorna o dependente cadastrado por id.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o dependente ID seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Dependente pegarIdDependente(@PathVariable Long id) throws RelationTypeNotFoundException {
        return dependenteService.listIdDependente(id);

    }

    @DeleteMapping("/deletar/{id}")
    @Operation(description = "Dado o id, deleta o dependente.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o dependente seja deletado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public ResponseEntity<String> deletarDependente(@PathVariable Long id) {
        try {
            dependenteService.deleteDependente(id);
            return ResponseEntity.ok("Dependente deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
