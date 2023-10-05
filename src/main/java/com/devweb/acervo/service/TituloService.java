package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.acervo.model.Titulo;
import com.devweb.acervo.repository.TituloRepository;

@Service
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
        return tituloRepo.save(editado);
    }

    public List<Titulo> listAll() {
        return tituloRepo.findAll();
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
