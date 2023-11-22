package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.acervo.model.Dependente;
import com.devweb.acervo.model.Locacao;
import com.devweb.acervo.model.Socio;
import com.devweb.acervo.repository.LocacaoRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Service
@Tag(name = "LocacaoService", description = "Fornece serviços web REST para acesso e manipulação de dados de Locacao.")
public class LocacaoService {

    @Autowired
    private LocacaoRepository locacaoRepo;

    public Locacao saveAll(Locacao locacao) {
        return locacaoRepo.save(locacao);
    }

    public Locacao editAll(Locacao locacao) throws RelationTypeNotFoundException {
        Locacao editado = locacaoRepo.findById(locacao.getIdLocacao())
                .orElseThrow(
                        () -> new RelationTypeNotFoundException(
                                "Locação não existe com id :" + locacao.getIdLocacao()));

        editado.setIdLocacao(locacao.getIdLocacao());
        editado.setDtLocacao(locacao.getDtLocacao());
        editado.setDtDevolucaoEfetiva(locacao.getDtDevolucaoEfetiva());
        editado.setDtDevolucaoPrevista(locacao.getDtDevolucaoEfetiva());
        editado.setMultaCobrada(locacao.getMultaCobrada());
        editado.setValorCobrado(locacao.getValorCobrado());
        editado.setItem(locacao.getItem());
        editado.setCliente(locacao.getCliente());

        return locacaoRepo.save(editado);

    }

    public List<Locacao> listAll() {
        return locacaoRepo.findAll();
    }

    public Locacao listId(Long idLocacao) throws RelationTypeNotFoundException {
        return locacaoRepo.findById(idLocacao)
                .orElseThrow(() -> new RelationTypeNotFoundException("Locação não existe com id :" + idLocacao));
    }

    public void deleteId(Long idLocacao) throws RelationTypeNotFoundException {
        Locacao locacao = locacaoRepo.findById(idLocacao)
                .orElseThrow(() -> new RelationTypeNotFoundException("Locação não existe com id :" + idLocacao));
        locacaoRepo.delete(locacao);
    }
}
