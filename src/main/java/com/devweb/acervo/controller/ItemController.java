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

import com.devweb.acervo.model.Item;
import com.devweb.acervo.service.ItemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/item")
@AllArgsConstructor
public class ItemController {

    @Autowired
    private final ItemService itemServ;

    @PostMapping("/criar")
    @Operation(description = "Dado o nome, cadastra um novo item.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o item seja incluído com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Item salvarItem(@RequestBody Item grava) {
        return itemServ.saveAll(grava);

    }

    @PutMapping("/editar")
    @Operation(description = "Dado o nome, o item é editado.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o item seja editado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Item editarItem(@RequestBody Item grava) throws RelationTypeNotFoundException {
        return itemServ.editAll(grava);

    }

    @GetMapping("/listar")
    @Operation(description = "Retorna todos os itemes cadastrados.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o item seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public List<Item> listarItem() {
        return itemServ.listAll();
    }

    @GetMapping("/listar/{id}")
    @Operation(description = "Retorna o item cadastrado por id.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o item ID seja listado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public Item pegarIdItem(@PathVariable Long id) throws RelationTypeNotFoundException {
        return itemServ.listId(id);

    }

    @DeleteMapping("/deletar/{id}")
    @Operation(description = "Dado o id, deleta o item.", responses = {
        @ApiResponse(responseCode = "200", description = "Caso o item seja deletado com sucesso."),
        @ApiResponse(responseCode = "400", description = "O servidor não pode processar a requisição devido a alguma coisa que foi entendida como um erro do cliente."),
        @ApiResponse(responseCode = "500", description = "Caso não tenha sido possível realizar a operação.")
    })
    public ResponseEntity<String> deletarItem(@PathVariable Long id) {
        try {
            itemServ.deleteId(id);
            return ResponseEntity.ok("Item deletado com sucesso");
        } catch (RelationTypeNotFoundException erro) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: " + erro.getMessage());
        }
    }
}
