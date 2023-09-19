import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { Classe } from 'src/app/models/classe.models';
import { ClasseService } from '../../criar/classe/service/classe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  
  classeData: Classe[] = [];
  unsubscribe$!: Subscription;
  classeParaDeletarId: number = -1;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private alertServ: AlertService,
    private classeService: ClasseService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.unsubscribe$ = this.classeService.listarClasse()
    .subscribe({
      next: (itens:any) => {
        const data = itens;
        this.classeData = data.sort((a:any, b:any) => (a.nome < b.nome) ? -1 : 1);
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
    this.router.navigate(['api/classe-create', id]);
  }

  definirIdParaDeletar(id: number) {
    this.classeParaDeletarId = id;
  }

  limparIdParaDeletar() {
    this.classeParaDeletarId = -1;
  }

  deletarID(id: number){
    this.classeService.deletarClasse(id).subscribe(data => {
      this.ngOnInit();
    });
  }
}
