package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.acervo.model.Classe;
import com.devweb.acervo.repository.ClasseRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Service
@Tag(name = "ClasseService", description = "Fornece serviços web REST para acesso e manipulação de dados de classes.")
public class ClasseService {

    @Autowired
    private ClasseRepository clasRepo;

    public Classe saveAll(Classe Classe) {
        return clasRepo.save(Classe);
    }

    public Classe editAll(Classe classe) throws RelationTypeNotFoundException {
        Classe editado = clasRepo.findById(classe.getIdClasse())
                .orElseThrow(
                        () -> new RelationTypeNotFoundException("Classe não existe com id :" + classe.getIdClasse()));

        editado.setIdClasse(classe.getIdClasse());
        editado.setNome(classe.getNome());
        editado.setValor(classe.getValor());
        editado.setPrazoDevolucao(classe.getPrazoDevolucao());
        return clasRepo.save(editado);
    }

    public List<Classe> listAll() {
        return clasRepo.findAll();
    }

    public Classe listId(Long idClasse) throws RelationTypeNotFoundException {
        return clasRepo.findById(idClasse)
                .orElseThrow(() -> new RelationTypeNotFoundException("Classe não existe com id :" + idClasse));
    }

    public void deleteId(Long idClasse) throws RelationTypeNotFoundException {
        Classe Classe = clasRepo.findById(idClasse)
                .orElseThrow(() -> new RelationTypeNotFoundException("Classe não existe com id :" + idClasse));
        clasRepo.delete(Classe);
    }
}
