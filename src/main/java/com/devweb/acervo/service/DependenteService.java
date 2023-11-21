package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.devweb.acervo.model.Dependente;
import com.devweb.acervo.repository.DependenteRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Service
@Tag(name = "DependenteService", description = "Fornece serviços web REST para acesso e manipulação de dados de dependentes.")
public class DependenteService {
    
    @Autowired
    private DependenteRepository dependenteRepository;

    public Dependente saveDependente(Dependente dependenteEntra) {
        return dependenteRepository.save(dependenteEntra);
    }

    public Dependente editDependente(Dependente dependenteEntra) throws RelationTypeNotFoundException {
        Dependente dependente = dependenteRepository.findById(dependenteEntra.getNumInscricao())
                    .orElseThrow(() -> new RelationTypeNotFoundException("Dependente não existe com número de inscrição:" + dependenteEntra.getNumInscricao()));
        dependente.setNumInscricao(dependenteEntra.getNumInscricao());
        dependente.setNome(dependenteEntra.getNome());
        dependente.setDtNascimento(dependenteEntra.getDtNascimento());
        dependente.setSexo(dependenteEntra.getSexo());
        dependente.setEstahAtivo(dependenteEntra.isEstahAtivo());
        dependente.setImagem(dependenteEntra.getImagem());
        
        return dependenteRepository.save(dependente);
    }
    
    public Dependente activeDependente(Dependente dependenteEntra) throws RelationTypeNotFoundException {
        Dependente dependente = dependenteRepository.findById(dependenteEntra.getNumInscricao())
                    .orElseThrow(() -> new RelationTypeNotFoundException("Sócio não existe com número de inscrição:" + dependenteEntra.getNumInscricao()));
        dependente.setEstahAtivo(true);

        return dependenteRepository.save(dependente);
    }
    
    public Dependente desactiveDependente(Dependente dependenteEntra) throws RelationTypeNotFoundException {
        Dependente dependente = dependenteRepository.findById(dependenteEntra.getNumInscricao())
                    .orElseThrow(() -> new RelationTypeNotFoundException("Sócio não existe com número de inscrição:" + dependenteEntra.getNumInscricao()));
        dependente.setEstahAtivo(false);

        return dependenteRepository.save(dependente);
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Dependente> listAllDependentes() {
        return dependenteRepository.findByDependentesOption();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Dependente> listAllDependentesQuery2() {
        return dependenteRepository.findAllByDependentesAtivos();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Dependente> listAllDependentesQuery3() {
        return dependenteRepository.findAllByDependentesInativos();
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
