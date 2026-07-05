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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/diretor")
@AllArgsConstructor
public class DiretorController {

    @Autowired
    private final DiretorService dirServ;

    @PostMapping("/criar")
    @Operation(description = "Dado o nome, cadastra um novo diretor.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o diretor seja incluído com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Diretor salvarDiretor(@RequestBody Diretor grava) {
        return dirServ.saveAll(grava);

    }

    @PutMapping("/editar")
    @Operation(description = "Dado o nome, o diretor é editado.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o diretor seja editado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Diretor editarDiretor(@RequestBody Diretor grava) throws RelationTypeNotFoundException {
        return dirServ.editAll(grava);

    }

    @GetMapping("/listar")
    @Operation(description = "Retorna todos os diretores cadastrados.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o diretor seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Diretor> listardiretor() {
        return dirServ.listAll();
    }

    @GetMapping("/listar/{id}")
    @Operation(description = "Retorna o diretor cadastrado por id.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o diretor ID seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Diretor pegarId(@PathVariable Long id) throws RelationTypeNotFoundException {
        return dirServ.listId(id);

    }

    @DeleteMapping("/deletar/{id}")
    @Operation(description = "Dado o id, deleta o diretor.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o diretor seja deletado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public ResponseEntity<String> deletarDiretor(@PathVariable Long id) {
        try {
            dirServ.deleteId(id);
            return ResponseEntity.ok("Diretor deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
