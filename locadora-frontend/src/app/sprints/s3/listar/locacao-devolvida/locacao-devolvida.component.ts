import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { Locacao } from 'src/app/models/locacao.models';
import { LocacaoService } from '../../criar/locacao/service/locacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locacao-devolvida',
  templateUrl: './locacao-devolvida.component.html',
  styleUrls: ['./locacao-devolvida.component.scss']
})
export class LocacaoDevolvidaComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  locacaoData: Locacao[] = [];
  unsubscribe$!: Subscription;
  valorMulta: any;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private alertServ: AlertService,
    private locacaoService: LocacaoService,
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.locacaoService.listarLocacaoDevolvida()
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

}
