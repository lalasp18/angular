import { debounceTime, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';
import { Diretor } from 'src/app/models/diretor.models';
import { DiretorService } from '../../criar/diretor/service/diretor.service';

@Component({
  selector: 'app-diretor-edit',
  templateUrl: './diretor-edit.component.html',
  styleUrls: ['./diretor-edit.component.scss']
})
export class DiretorEditComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  diretorID!: Diretor;
  diretorEditado: Diretor[] = [];
  diretorform: FormGroup;
  unsubscribe$!: Subscription;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private diretorService: DiretorService,
    private route: ActivatedRoute
  ) {
    this.diretorform = this.formBuilder.group({
      idDiretor: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.diretorService.pegarIdDiretor(id)
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.diretorID = data;
          
          this.diretorform.get("idDiretor")?.setValue(this.diretorID.idDiretor); 
          this.diretorform.get("nome")?.setValue(this.diretorID.nome);
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
  enviarFormDiretor() {
    this.diretorService.editarDiretor(this.diretorEditado).subscribe({
      next: (data: any) => {
        this.diretorEditado = data;
        this.goToRoute();
        this.alertServ.success('Diretor editado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Edição não enviada.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/diretor-create/editar']);
  }

  onSubmit() {
    console.log(this.diretorform.valid);
    if (this.diretorform.valid) {
      this.diretorEditado = this.diretorform.value;
      this.enviarFormDiretor();
      this.diretorform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
