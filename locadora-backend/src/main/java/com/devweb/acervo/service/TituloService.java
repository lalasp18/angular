package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.devweb.acervo.model.Item;
import com.devweb.acervo.model.Titulo;
import com.devweb.acervo.repository.TituloRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Service
@Tag(name = "TituloService", description = "Fornece serviços web REST para acesso e manipulação de dados de títulos.")
public class TituloService {

    @Autowired
    private TituloRepository tituloRepo;

    public Titulo saveAll(Titulo titulo) {
        return tituloRepo.save(titulo);
    }

    public Titulo editAll(Titulo titulo) throws RelationTypeNotFoundException {
        Titulo editado = tituloRepo.findById(titulo.getIdTitulo())
                .orElseThrow(
                        () -> new RelationTypeNotFoundException("Titulo não existe com id :" + titulo.getIdTitulo()));

        editado.setIdTitulo(titulo.getIdTitulo());
        editado.setNome(titulo.getNome());
        editado.setAno(titulo.getAno());
        editado.setSinopse(titulo.getSinopse());
        editado.setCategoria(titulo.getCategoria());
        editado.setAtores(titulo.getAtores());
        editado.setDiretor(titulo.getDiretor());
        editado.setClasse(titulo.getClasse());
        editado.setImagem(titulo.getImagem());
        return tituloRepo.save(editado);
    }

    public List<Titulo> listAll() {
        return tituloRepo.findAll();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Titulo> listTituloNome(String nome) {
        return tituloRepo.findTituloNome(nome);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Titulo> listTituloAtor(String nomeator) {
        return tituloRepo.findTituloAtor(nomeator);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Titulo> listTituloCategoria(String nomeCategoria) {
        System.out.println("VEIO AQUI O PARAMETRO EM SERVICE:" + nomeCategoria);
        System.out.println("VEIO NA QUERY:" + tituloRepo.findTituloCategoria(nomeCategoria));
        return tituloRepo.findTituloCategoria(nomeCategoria);
    }

    public Titulo listId(Long idTitulo) throws RelationTypeNotFoundException {
        return tituloRepo.findById(idTitulo)
                .orElseThrow(() -> new RelationTypeNotFoundException("Titulo não existe com id :" + idTitulo));
    }

    public void deleteId(Long idTitulo) throws RelationTypeNotFoundException {
        Titulo titulo = tituloRepo.findById(idTitulo)
                .orElseThrow(() -> new RelationTypeNotFoundException("Titulo não existe com id :" + idTitulo));
        tituloRepo.delete(titulo);
    }
}
