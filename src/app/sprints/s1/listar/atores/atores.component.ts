import { debounceTime } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { AtorService } from '../../criar/ator/service/ator.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Ator } from 'src/app/models/ator.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-atores',
  templateUrl: './atores.component.html',
  styleUrls: ['./atores.component.scss']
})
export class AtoresComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  
  atorData: Ator[] = [];
  unsubscribe$!: Subscription;
  atorParaDeletarId: number = -1;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private alertServ: AlertService,
    private atorService: AtorService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.unsubscribe$ = this.atorService.listarAtor()
    .subscribe({
      next: (itens:any) => {
        const data = itens;
        this.atorData = data.sort((a:any, b:any) => (a.nome < b.nome) ? -1 : 1);
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

  editarID(idAtor: number) {
    this.router.navigate(['api/ator/listar', idAtor]);
  }

  definirIdParaDeletar(id: number) {
    this.atorParaDeletarId = id;
  }

  limparIdParaDeletar() {
    this.atorParaDeletarId = -1;
  }
  
  deletarID(id: number) {
    this.atorService.deletarAtor(id)
      .subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => {
          if (error.status) {
            alert('Erro: Não foi possível deletar Ator associado à Título.');
          } else {
            console.log('Erro desconhecido:', error);
          }
        }
      );
  }
}
