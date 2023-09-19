import { Component, OnInit, ViewChild } from '@angular/core';
import { ClasseService } from './service/classe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';
import { Classe } from 'src/app/models/classe.models';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  classes: Classe[] = [];
  classeform: FormGroup;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private classeService: ClasseService
  ) {
    this.classeform = this.formBuilder.group({
      idClasse: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      valor: [null, [Validators.required, Validators.minLength(0)]],
      prazoDevolucao: [null, [Validators.required]]
    });
  }

  ngOnInit() {

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

  close() {
    this.alertMessage = '';
  }

  //  SALVA FORM PELO SERVICE DO BACK-END
  enviarFormClasse() {
    this.classeService.salvarClasse(this.classes).subscribe({
      next: (data: any) => {
        this.classes = data;
        this.goToRoute();
        this.alertServ.success('Classe cadastrada com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/classe-create']);
  }

  onSubmit() {
    console.log(this.classeform.valid);
    if (this.classeform.valid) {
      this.classes = this.classeform.value;
      this.enviarFormClasse();
      this.classeform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
