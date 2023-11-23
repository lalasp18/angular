import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { Locacao } from 'src/app/models/locacao.models';
import { LocacaoService } from '../../criar/locacao/service/locacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locacao-pendente',
  templateUrl: './locacao-pendente.component.html',
  styleUrls: ['./locacao-pendente.component.scss']
})
export class LocacaoPendenteComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  locacaoData: Locacao[] = [];
  unsubscribe$!: Subscription;
  locacaoParaDevolverId: number = -1;
  itemParaDevolverNome: string = "";
  valorMulta: any;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private alertServ: AlertService,
    private locacaoService: LocacaoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.locacaoService.listarLocacaoPendente()
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.locacaoData = data.sort((a: any, b: any) => (a.idLocacao < b.idLocacao) ? -1 : 1);
        },
        error: (err: any) => {
          this.alertServ.warning('Dados não encontrados.')
        }
      });

    this.alertServ.getMessage().subscribe(message => {
      if (message) {
        this.alertMessage = message.text;
        this.alertType = message.type;
        this.alertServ.getMessage().pipe(debounceTime(5000)).subscribe(() => {
          if (this.selfClosingAlert) {
            this.selfClosingAlert.close();
          }
        });
      } else {
        this.alertMessage = undefined;
        this.alertType = undefined;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  close() {
    this.alertMessage = '';
  }

  definirIdParaDevolver(id: number, item: string) {
    this.locacaoParaDevolverId = id;
    this.itemParaDevolverNome = item;
    this.locacaoService.pegarIdLocacao(id).subscribe({
      next: (data: Locacao) => {
        let dtAtual = new Date();
        let outraDt = new Date(data.dtDevolucaoPrevista)
        if (outraDt < dtAtual) {
          let dias = this.diferencaEmDias(outraDt, dtAtual);
          this.valorMulta = dias * 12;
        } else {
          this.valorMulta = "Este cliente não possui multa.";
        }
      }
    })
    this.valorMulta = 858585;
  }

  diferencaEmDias(outraData: Date, dataAtual: Date) {
    const tempoAtual = dataAtual.getTime();
    const tempoOutraData = outraData.getTime();

    const diferencaEmMilissegundos = tempoAtual - tempoOutraData;
    const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    return diferencaEmDias;
  }

  limparIdParaDevolver() {
    this.locacaoParaDevolverId = -1;
  }

  devolverID(id: number) {
    this.locacaoService.editarLocacao(id).subscribe(data => {
      this.ngOnInit();
    });
  }
}
