import { Component, OnInit, ViewChild } from '@angular/core';
import { AtorService } from './service/ator.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ator } from 'src/app/models/ator.models';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-ator',
  templateUrl: './ator.component.html',
  styleUrls: ['./ator.component.scss']
})
export class AtorComponent implements OnInit {
	@ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  
  atores: Ator[] = [];
  atorform: FormGroup;
  
  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private atorService: AtorService
  ) {
    this.atorform = this.formBuilder.group({
      idAtor: [null],
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
  enviarFormAtor(){
    this.atorService.salvarAtor(this.atores).subscribe({
      next: (data:any) => {
        this.atores = data;
        this.goToRoute();
        this.alertServ.success('Cadastrado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRoute(){
    this.router.navigate(['api/ator-create']);
  }

  onSubmit() {
    console.log(this.atorform.valid);
    if(this.atorform.valid) {
      this.atores = this.atorform.value;
      this.enviarFormAtor();
      this.atorform.reset();
    } else {
      this.alertServ.error('Informação inválida. Preencha o campo!')
    }
  }
}
