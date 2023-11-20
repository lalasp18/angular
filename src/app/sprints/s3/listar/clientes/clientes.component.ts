import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { SocioService } from '../../criar/cliente/service/socio.service';
import { DependenteService } from '../../criar/cliente/service/dependente.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Dependente, Socio } from 'src/app/models/cliente.models';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  socioDataAtivo: Socio[] = [];
  socioDataInativo: Socio[] = [];
  dependenteDataAtivo: Dependente[] = [];
  dependenteDataInativo: Dependente[] = [];
  
  unsubscribeSocA$!: Subscription;
  unsubscribeSocI$!: Subscription;
  unsubscribeDepA$!: Subscription;
  unsubscribeDepI$!: Subscription;
  
  showStatus: boolean = true;
  showDepA: boolean = false;
  showDepI: boolean = false;
  showSocA: boolean = false;
  showSocI: boolean = false;

  messageSocA: string = "";
  messageSocI: string = "";
  messageDepA: string = "";
  messageDepI: string = "";

  socioParaDeletarId: number = -1;
  socioParaDeletarNome: string = "";
  dependenteParaDeletarId: number = -1;
  dependenteParaDeletarNome: string = "";

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private alertServ: AlertService,
    private socioService: SocioService,
    private dependenteService: DependenteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unsubscribeSocA$ = this.socioService.listarSocioAtivo()
      .subscribe({
        next: (itens: any) => {
          this.socioDataAtivo = itens.sort((a: any, b: any) => (a.nome < b.nome) ? -1 : 1);
          if (this.socioDataAtivo.length <= 0) {
            this.showSocA = true;
            this.messageSocA = 'Nenhum sócio ativo encontrado.';
          }
        },
        error: (err: any) => {
          this.alertServ.warning('Dados sócios ativos não encontrados.')
        }
      });
    this.unsubscribeSocI$ = this.socioService.listarSocioInativo()
      .subscribe({
        next: (itens: any) => {
          this.socioDataInativo = itens.sort((a: any, b: any) => (a.nome < b.nome) ? -1 : 1);
          if (this.socioDataInativo.length <= 0) {
            this.showSocI = true;
            this.messageSocI = 'Nenhum sócio inativo encontrado.';
          }
        },
        error: (err: any) => {
          this.alertServ.warning('Dados sócios inativos não encontrados.')
        }
      });

    this.unsubscribeDepA$ = this.dependenteService.listarDependenteAtivo()
      .subscribe({
        next: (itens: any) => {
          this.dependenteDataAtivo = itens.sort((a: any, b: any) => (a.nome < b.nome) ? -1 : 1);
          if (this.dependenteDataAtivo.length <= 0) {
            this.showDepA = true;
            this.messageDepA = 'Nenhum dependente ativo encontrado.';
          }
        },
        error: (err: any) => {
          this.alertServ.warning('Dados dependentes ativos não encontrados.')
        }
      });

    this.unsubscribeDepI$ = this.dependenteService.listarDependenteInativo()
      .subscribe({
        next: (itens: any) => {
          this.dependenteDataInativo = itens.sort((a: any, b: any) => (a.nome < b.nome) ? -1 : 1);
          if (this.dependenteDataInativo.length <= 0) {
            this.showDepI = true;
            this.messageDepI = 'Nenhum dependente inativo encontrado.';
          }
        },
        error: (err: any) => {
          this.alertServ.warning('Dados dependentes inativos não encontrados.')
        }
      });

    this.alertServ.getMessage().subscribe((message:any) => {
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
    this.unsubscribeSocA$.unsubscribe();
    this.unsubscribeSocI$.unsubscribe();
    
    this.unsubscribeDepA$.unsubscribe();
    this.unsubscribeDepI$.unsubscribe();
  }

  close() {
    this.alertMessage = '';
  }

  onChange(event: any) {
    if (event.target.id === 'flexRadioAtivo') {
      this.showStatus = true;
      this.ngOnInit();
    } else {
      this.showStatus = false;
      this.ngOnInit();
    }
  }

  formatarDependentes(dependentes: Dependente[]) {
    return dependentes.map(depende => depende.nome).join(', ');
  }

  editarIDSocio(id: number) {
    this.router.navigate(['api/socio/listar', id]);
  }

  editarIDDependente(id: number) {
    this.router.navigate(['api/dependente/listar', id]);
  }

  definirIdParaDeletarSocio(id: number, nome: string) {
    this.socioParaDeletarId = id;
    this.socioParaDeletarNome = nome;
  }

  limparIdParaDeletarSocio() {
    this.socioParaDeletarId = -1;
  }

  deletarIDSocio(id: number) {
    this.socioService.deletarSocio(id)
    .subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      },
      error => {
        if (error.status) {
          alert('Erro: Não foi possível deletar Sócio com alocação pendente.');
        } else {
          console.log('Erro desconhecido:', error);
        }
      }
    );
  }

  definirIdParaDeletarDepende(id: number, nome: string) {
    this.dependenteParaDeletarId = id;
    this.dependenteParaDeletarNome = nome;
  }

  limparIdParaDeletarDepende() {
    this.dependenteParaDeletarId = -1;
  }

  deletarIDDepende(id: number) {
    this.dependenteService.deletarDependente(id)
    .subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      },
      error => {
        if (error.status) {
          alert('Erro: Não foi possível deletar Dependente com alocação pendente.');
        } else {
          console.log('Erro desconhecido:', error);
        }
      }
    );
  }
}
