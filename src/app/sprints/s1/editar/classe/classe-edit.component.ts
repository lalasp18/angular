import { debounceTime, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';
import { Classe } from 'src/app/models/classe.models';
import { ClasseService } from '../../criar/classe/service/classe.service';


@Component({
  selector: 'classe-ator-edit',
  templateUrl: './classe-edit.component.html',
  styleUrls: ['./classe-edit.component.scss']
})
export class ClasseEditComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  classeID!: Classe;
  classeEditado: Classe[] = [];
  classeform: FormGroup;
  unsubscribe$!: Subscription;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private classeService: ClasseService,
    private route: ActivatedRoute
  ) {
    this.classeform = this.formBuilder.group({
      idClasse: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      valor: [null],
      prazoDevolucao: [null]
    });
  }

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.classeService.pegarIdClasse(id)
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.classeID = data;

          this.classeform.get("idClasse")?.setValue(this.classeID.idClasse); 
          this.classeform.get("nome")?.setValue(this.classeID.nome);
          this.classeform.get("valor")?.setValue(this.classeID.valor);
          this.classeform.get("prazoDevolucao")?.setValue(this.classeID.prazoDevolucao);
        },
        error: (err: any) => {
          this.alertServ.error('ERRO! Dados não encontrados!')
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

  //  SALVA FORM PELO SERVICE DO BACK-END
  enviarFormClasse() {
    this.classeService.editarClasse(this.classeEditado).subscribe({
      next: (data: any) => {
        this.classeEditado = data;
        this.goToRoute();
        this.alertServ.success('Classe editada com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Edição não enviada.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/classe-create/editar']);
  }

  onSubmit() {
    console.log(this.classeform.value)
    if (this.classeform.valid) {
      this.classeEditado = this.classeform.value;
      this.enviarFormClasse();
      this.classeform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
