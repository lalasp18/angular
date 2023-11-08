package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.acervo.model.Dependente;
import com.devweb.acervo.repository.DependenteRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Service
@Tag(name = "DependenteService", description = "Fornece serviços web REST para acesso e manipulação de dados de dependentes.")
public class DependenteService {
    
    @Autowired
    private DependenteRepository dependenteRepository;

    public Dependente saveDependente(Dependente socioEntra) {
        return dependenteRepository.save(socioEntra);
    }

    public Dependente editDependente(Dependente socioEntra) throws RelationTypeNotFoundException {
        Dependente dependente = dependenteRepository.findById(socioEntra.getNumInscricao())
                    .orElseThrow(() -> new RelationTypeNotFoundException("Dependente não existe com número de inscrição:" + socioEntra.getNumInscricao()));
        dependente.setNumInscricao(socioEntra.getNumInscricao());
        dependente.setNome(socioEntra.getNome());
        dependente.setDtNascimento(socioEntra.getDtNascimento());
        dependente.setSexo(socioEntra.getSexo());
        dependente.setEstahAtivo(socioEntra.isEstahAtivo());
        
        return dependenteRepository.save(dependente);
    }

    public List<Dependente> listAllDependentes() {
        return dependenteRepository.findAll();
    }

    public Dependente listIdDependente(Long id) throws RelationTypeNotFoundException {
        return dependenteRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Dependente não existe com número de inscrição:" + id));
    }

    public void deleteDependente(Long id) throws RelationTypeNotFoundException {
        Dependente pa = dependenteRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Dependente não existe com número de inscrição:" + id));
        
        dependenteRepository.delete(pa);
    }
}
