import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';
import { Titulo } from 'src/app/models/titulo.models';
import { TituloService } from '../../criar/titulo/service/titulo.service';


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

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  close() {
    this.alertMessage = '';
  }

  editarID(id: number) {
    this.router.navigate(['api/titulo-create', id]);
  }

  definirIdParaDeletar(id: number) {
    this.titulosParaDeletarId = id;
  }

  limparIdParaDeletar() {
    this.titulosParaDeletarId = -1;
  }


  deletarID(id: number) {
    this.tituloService.deletarTitulo(id).subscribe(data => {
      this.ngOnInit();
    });
  }
}