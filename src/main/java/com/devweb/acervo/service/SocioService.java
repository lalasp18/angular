package com.devweb.acervo.service;

import java.util.List;

import javax.management.relation.RelationTypeNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.acervo.model.Dependente;
import com.devweb.acervo.model.Socio;
import com.devweb.acervo.repository.SocioRepository;

import io.swagger.v3.oas.annotations.tags.Tag;

@Service
@Tag(name = "SocioService", description = "Fornece serviços web REST para acesso e manipulação de dados de sócios.")
public class SocioService {
    
    @Autowired
    private SocioRepository socioRepository;

    public Socio saveSocio(Socio socioEntra) {
        long countActiveDependents = socioEntra.getDependentes()
                .stream()
                .filter(Dependente::isEstahAtivo)
                .count();
    
        if (countActiveDependents <= 3) {
            return socioRepository.save(socioEntra);
        } else {
            throw new IllegalArgumentException("Não é possível salvar o sócio, pois existem mais de 3 dependentes ativos.");
        }
    }
    

    public Socio editSocio(Socio socioEntra) throws RelationTypeNotFoundException {
        Socio socio = socioRepository.findById(socioEntra.getNumInscricao())
                    .orElseThrow(() -> new RelationTypeNotFoundException("Sócio não existe com número de inscrição:" + socioEntra.getNumInscricao()));
        socio.setNumInscricao(socioEntra.getNumInscricao());
        socio.setNome(socioEntra.getNome());
        socio.setDtNascimento(socioEntra.getDtNascimento());
        socio.setSexo(socioEntra.getSexo());
        socio.setEstahAtivo(socioEntra.isEstahAtivo());
        socio.setCpf(socioEntra.getCpf());
        socio.setEndereco(socioEntra.getEndereco());
        socio.setTel(socioEntra.getTel());
        List<Dependente> dependentes = socioEntra.getDependentes();
        
        long countActiveDependents = socioEntra.getDependentes()
                .stream()
                .filter(Dependente::isEstahAtivo)
                .count();
    
        if (countActiveDependents <= 3) {
            if(socio.isEstahAtivo() == false && dependentes.size() > 0) {
                for (Dependente dependente : dependentes) {
                    dependente.setEstahAtivo(false);
                }
            } else if (socioEntra.isEstahAtivo() == false && socio.isEstahAtivo() == true && dependentes.size() > 0) {
                for (Dependente dependente : dependentes) {
                    dependente.setEstahAtivo(true);
                }
            }
            return socioRepository.save(socio);
        } else {
            throw new IllegalArgumentException("O número de dependentes ativos não pode exceder 3.");
        }
    }

    public List<Socio> listAllSocios() {
        return socioRepository.findAll();
    }

    public Socio listIdSocio(Long id) throws RelationTypeNotFoundException {
        return socioRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Sócio não existe com número de inscrição:" + id));
    }

    public void deleteSocio(Long id) throws RelationTypeNotFoundException {
        Socio pa = socioRepository.findById(id)
            .orElseThrow(() -> new RelationTypeNotFoundException("Sócio não existe com número de inscrição:" + id));
        
        socioRepository.delete(pa);
    }
}
