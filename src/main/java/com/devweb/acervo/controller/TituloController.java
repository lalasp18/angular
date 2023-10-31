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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/titulo")
@AllArgsConstructor
public class TituloController {

    @Autowired
    private final TituloService tituloServ;

    @PostMapping("/criar")
    @Operation(description = "Dado o nome, cadastra um novo título.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o título seja incluído com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Titulo salvarTitulo(@RequestBody Titulo grava) {
        return tituloServ.saveAll(grava);

    }

    @PutMapping("/editar")
    @Operation(description = "Dado o nome, o título é editado.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o título seja editado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Titulo editarTitulo(@RequestBody Titulo grava) throws RelationTypeNotFoundException {
        return tituloServ.editAll(grava);

    }

    @GetMapping("/listar")
    @Operation(description = "Retorna todos os títuloes cadastrados.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o título seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Titulo> listarTitulo() {
        return tituloServ.listAll();
    }

    @GetMapping("/listar/{id}")
    @Operation(description = "Retorna o título cadastrado por id.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o título ID seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Titulo pegarIdTitulo(@PathVariable Long id) throws RelationTypeNotFoundException {
        return tituloServ.listId(id);

    }

    @DeleteMapping("/deletar/{id}")
    @Operation(description = "Dado o id, deleta o título.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o título seja deletado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public ResponseEntity<String> deletarTitulo(@PathVariable Long id) {
        try {
            tituloServ.deleteId(id);
            return ResponseEntity.ok("Título deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
