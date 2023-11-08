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

import com.devweb.acervo.model.Socio;
import com.devweb.acervo.service.SocioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/socio")
@AllArgsConstructor
public class SocioController {

    @Autowired
    private final SocioService socioService;

    @PostMapping("/criar")
    @Operation(description = "Dado o nome, cadastra um novo sócio.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o sócio seja incluído com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Socio salvarSocio(@RequestBody Socio grava) {
        return socioService.saveSocio(grava);

    }

    @PutMapping("/editar")
    @Operation(description = "Dado o nome, o sócio é editado.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o sócio seja editado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Socio editarSocio(@RequestBody Socio grava) throws RelationTypeNotFoundException {
        return socioService.editSocio(grava);

    }

    @GetMapping("/listar")
    @Operation (description="Retorna todos os sócioes cadastrados.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o sócio seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Socio> listarSocio() {
        return socioService.listAllSocios();
    }

    @GetMapping("/listar/{id}")
    @Operation (description="Retorna o sócio cadastrado por id.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o sócio ID seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Socio pegarIdSocio(@PathVariable Long id) throws RelationTypeNotFoundException {
        return socioService.listIdSocio(id);

    }

    @DeleteMapping("/deletar/{id}")
    @Operation(description = "Dado o id, deleta o sócio.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o sócio seja deletado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public ResponseEntity<String> deletarSocio(@PathVariable Long id) {
        try {
            socioService.deleteSocio(id);
            return ResponseEntity.ok("Sócio deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
