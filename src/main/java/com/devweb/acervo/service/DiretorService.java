package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.acervo.model.Diretor;
import com.devweb.acervo.repository.DiretorRepository;

@Service
public class DiretorService {

    @Autowired
    private DiretorRepository dirRepo;

    public Diretor saveAll(Diretor diretor) {
        return dirRepo.save(diretor);
    }

    public Diretor editAll(Diretor diretor) throws RelationTypeNotFoundException {
        Diretor editado = dirRepo.findById(diretor.getIdDiretor())
                .orElseThrow(() -> new RelationTypeNotFoundException(
                        "Diretor não existe com id :" + diretor.getIdDiretor()));

        editado.setIdDiretor(diretor.getIdDiretor());
        editado.setNome(diretor.getNome());
        return dirRepo.save(editado);
    }

    public List<Diretor> listAll() {
        return dirRepo.findAll();
    }

    public Diretor listId(Long idDiretor) throws RelationTypeNotFoundException {
        return dirRepo.findById(idDiretor)
                .orElseThrow(() -> new RelationTypeNotFoundException("Diretor não existe com id :" + idDiretor));
    }

    public void deleteId(Long idDiretor) throws RelationTypeNotFoundException {
        Diretor diretor = dirRepo.findById(idDiretor)
                .orElseThrow(() -> new RelationTypeNotFoundException("Ator não existe com id :" + idDiretor));
        dirRepo.delete(diretor);
    }
}
