import { debounceTime } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_services/alert.service';
import { DiretorService } from '../../criar/diretor/service/diretor.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Diretor } from 'src/app/models/diretor.models';

@Component({
  selector: 'app-diretores/',
  templateUrl: './diretores.component.html',
  styleUrls: ['./diretores.component.scss']
})
export class DiretoresComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  diretorData: Diretor[] = [];
  unsubscribe$!: Subscription;
  diretorParaDeletarId: number = -1;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private alertServ: AlertService,
    private diretorService: DiretorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribe$ = this.diretorService.listarDiretor()
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.diretorData = data.sort((a: any, b: any) => (a.nome < b.nome) ? -1 : 1);
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
    this.router.navigate(['api/diretor-create', id]);
  }

  definirIdParaDeletar(id: number) {
    this.diretorParaDeletarId = id;
  }

  limparIdParaDeletar() {
    this.diretorParaDeletarId = -1;
  }

  deletarID(id: number) {
    this.diretorService.deletarDiretor(id).subscribe(data => {
      this.ngOnInit();
    });
  }
}
