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
  locacaoParaDevolver!: Locacao;
  itemParaDevolverNome: string = "";

  valorMulta: number = 0;
  valorMultaMessage: string = "";
  dataEfet: any;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private alertServ: AlertService,
    private locacaoService: LocacaoService,
    private router: Router
  ) { 
  }

  ngOnInit() {

    this.unsubscribe$ = this.locacaoService.listarLocacaoPendente()
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.locacaoData = data.sort((a: any, b: any) => (a.idLocacao < b.idLocacao) ? -1 : 1);
          this.dataEfet = document.getElementById('efetDev') as HTMLInputElement;
          this.dataEfet.valueAsDate = new Date();
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
    this.itemParaDevolverNome = item;
    this.locacaoService.pegarIdLocacao(id).subscribe({
      next: (data: Locacao) => {
        this.locacaoParaDevolver = data;
        let dtAtual = new Date();
        let locacaoIdDt = new Date(data.dtDevolucaoPrevista)
        if (locacaoIdDt < dtAtual) {
          let dias = this.diferencaEmDias(locacaoIdDt, dtAtual);
          this.valorMulta = dias * 12;
          this.valorMultaMessage = "";
          this.locacaoParaDevolver.multaCobrada = this.valorMulta;
        } else {
          this.valorMultaMessage = "Este cliente não possui multa.";
        }
      }
    })
  }

  diferencaEmDias(locacaoIdData: Date, dataAtual: Date) {
    const tempoAtual = dataAtual.getTime();
    const tempolocacaoIdData = locacaoIdData.getTime();

    const diferencaEmMilissegundos = tempoAtual - tempolocacaoIdData;
    const diferencaEmDias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    return diferencaEmDias;
  }
  
  limparLocacaoParaDevolver() {
    this.locacaoParaDevolver = {} as Locacao;
    this.itemParaDevolverNome = "";
    console.log(this.dataEfet)
  }

  devolverID() {
    let inputDate = document.getElementById('efetDev') as HTMLInputElement;
    if(inputDate){
      this.locacaoParaDevolver.dtDevolucaoEfetiva = this.dataEfet.value;
      this.locacaoParaDevolver.dtDevolucaoPrevista = this.dataEfet.value;
    }
    this.locacaoService.editarLocacao(this.locacaoParaDevolver).subscribe(data => {
      this.ngOnInit();
    });
  }
}
