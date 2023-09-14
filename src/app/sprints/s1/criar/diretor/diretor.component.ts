import { Component, OnInit, ViewChild } from '@angular/core';
import { DiretorService } from './service/diretor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';
import { Diretor } from 'src/app/models/diretor.models';

@Component({
  selector: 'app-diretor',
  templateUrl: './diretor.component.html',
  styleUrls: ['./diretor.component.scss']
})
export class DiretorComponent implements OnInit {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  diretores: Diretor[] = [];
  diretorform: FormGroup;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private diretorService: DiretorService
  ) {
    this.diretorform = this.formBuilder.group({
      idDiretor: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
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
  enviarFormDiretor() {
    this.diretorService.salvarDiretor(this.diretores).subscribe({
      next: (data: any) => {
        this.diretores = data;
        this.goToRoute();
        this.alertServ.success('Diretor cadastrado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/diretor-create']);
  }

  onSubmit() {
    console.log(this.diretorform.valid);
    if (this.diretorform.valid) {
      this.diretores = this.diretorform.value;
      this.enviarFormDiretor();
      this.diretorform.reset();
    } else {
      this.alertServ.error('Informação inválida. Preencha o campo!')
    }
  }
}
