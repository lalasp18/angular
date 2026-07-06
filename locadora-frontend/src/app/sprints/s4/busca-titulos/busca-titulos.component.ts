import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { Ator } from 'src/app/models/ator.models';
import { Titulo } from 'src/app/models/titulo.models';
import { TituloService } from '../../s2/criar/titulo/service/titulo.service';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-busca-titulos',
  templateUrl: './busca-titulos.component.html',
  styleUrls: ['./busca-titulos.component.scss']
})
export class BuscaTitulosComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  tituloData: Titulo[] = [];
  tituloFilter: Titulo[] = [];
  unsubscribe$!: Subscription;

  textParam: string = '';
  showAlert: boolean = false;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private alertServ: AlertService,
    private tituloService: TituloService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.tituloService.listarTitulo()
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.tituloData = data;
          if (this.tituloData.length <= 0) {
            this.alertServ.warning('Não há título cadastrado.')
          }
        },
        error: (err: any) => {
          this.alertServ.error('Dados não encontrados.')
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

  formatarAtores(atores: Ator[]) {
    return atores.map(ator => ator.nome).join(', ');
  }

  procurarFilter() {
    const tipo = document.getElementById('selectParam') as HTMLInputElement;
    const param = document.getElementById('inputParam') as HTMLInputElement;
    this.textParam = param.value;

    if (tipo.value == "1") {
      this.tituloFilter = this.tituloData.filter(el => {
        if (el.nome.toLowerCase().includes(this.textParam.toLowerCase())) {
          this.showAlert = false;
          return el;
        } else {
          this.showAlert = true;
          this.alertServ.warning('Não  título com esse nome.');
          return null;
        }
      })
    }
    else if (tipo.value == '2') {
      this.tituloFilter = this.tituloData.filter(el => {
        if (el.categoria.toLowerCase().includes(this.textParam.toLowerCase())) {
          this.showAlert = false;
          return el;
        } else {
          this.showAlert = true;
          this.alertServ.warning('Não há título com essa categoria.');
          return null;
        }
      })
    }
    else if (tipo.value == '3') {
      this.tituloFilter = [];
      this.tituloData.filter(el => {
        el.atores.filter(ator => {
          if (ator.nome.toLowerCase().includes(this.textParam.toLowerCase())) {
            this.showAlert = false;
            this.tituloFilter.push(el);
          }
          
          else {
            this.showAlert = true;
            this.alertServ.warning('Não há título com o nome desse ator.');
          }
        })
      })
      console.log(this.tituloFilter)
    }
  }
}
