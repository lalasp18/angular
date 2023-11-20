import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';
import { Titulo } from 'src/app/models/titulo.models';
import { TituloService } from '../../criar/titulo/service/titulo.service';
import { Ator } from 'src/app/models/ator.models';


@Component({
  selector: 'app-titulo',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.scss']
})
export class TitulosComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  tituloData: Titulo[] = [];
  unsubscribe$!: Subscription;
  titulosParaDeletarId: number = -1;
  show1: boolean = true;
  show2: boolean = false;
  show3: boolean = false;
  atores: any;

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
          this.tituloData = data.sort((a: any, b: any) => (a.nome < b.nome) ? -1 : 1);

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

  mudarTab(tab: string) {
    this.show1 = tab === 'tab1';
    this.show2 = tab === 'tab2';
    this.show3 = tab === 'tab3';
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  close() {
    this.alertMessage = '';
  }

  editarID(id: number) {
    this.router.navigate(['api/titulo/listar', id]);
  }

  definirIdParaDeletar(id: number) {
    this.titulosParaDeletarId = id;
  }

  limparIdParaDeletar() {
    this.titulosParaDeletarId = -1;
  }

  deletarID(id: number) {
    this.tituloService.deletarTitulo(id)
    .subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      },
      error => {
        if (error.status) {
          alert('Erro: Não foi possível deletar Título associado à Item.');
        } else {
          console.log('Erro desconhecido:', error);
        }
      }
    );
  }

  formatarAtores(atores: Ator[]) {
    return atores.map(ator => ator.nome).join(', ');
  }
}