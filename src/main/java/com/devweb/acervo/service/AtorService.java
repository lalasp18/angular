package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.acervo.model.Ator;
import com.devweb.acervo.repository.AtorRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Service
@Tag(name = "AtorService", description = "Fornece serviços web REST para acesso e manipulação de dados de atores.")
public class AtorService {
    
    @Autowired
    private AtorRepository atRepo;

    public Ator saveAll(Ator ator) {
        return atRepo.save(ator);
    }

    public Ator editAll(Ator ator) throws RelationTypeNotFoundException {
        Ator editado = atRepo.findById(ator.getIdAtor())
            .orElseThrow(() -> new RelationTypeNotFoundException("Ator não existe com id :" + ator.getIdAtor()));
        
        editado.setIdAtor(ator.getIdAtor());
        editado.setNome(ator.getNome());
        return atRepo.save(editado);
    }

    public List<Ator> listAll() {
        return atRepo.findAll();
    }

    public Ator listId(Long idAtor) throws RelationTypeNotFoundException {
        return atRepo.findById(idAtor)
            .orElseThrow(() -> new RelationTypeNotFoundException("Ator não existe com id :" + idAtor));
    }

    public void deleteId(Long idAtor) throws RelationTypeNotFoundException {
        Ator ator = atRepo.findById(idAtor)
            .orElseThrow(() -> new RelationTypeNotFoundException("Ator não existe com id :" + idAtor));  
        atRepo.delete(ator);
    }
}
