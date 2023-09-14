import { debounceTime, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';
import { Ator } from 'src/app/models/ator.models';
import { AtorService } from '../../criar/ator/service/ator.service';

@Component({
  selector: 'app-ator-edit',
  templateUrl: './ator-edit.component.html',
  styleUrls: ['./ator-edit.component.scss']
})
export class AtorEditComponent implements OnInit {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  @ViewChild('inputID', { static: false }) meuID!: ElementRef;
  @ViewChild('inputNome', { static: false }) meuNome!: ElementRef;
  
  atorID!: Ator;
  atorEditado: Ator[] = [];
  atorform: FormGroup;
  unsubscribe$!: Subscription;
  
  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private atorService: AtorService,
    private route: ActivatedRoute
  ) {
    this.atorform = this.formBuilder.group({
      idAtor: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.atorService.pegarIdAtor(id)
    .subscribe({
      next: (itens:any) => {
        const data = itens;
        this.atorID = data;
        this.meuID.nativeElement.value = this.atorID.idAtor;
        this.meuNome.nativeElement.value =this.atorID.nome;
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

  close() {
    this.alertMessage = '';
  }
  
  //  SALVA FORM PELO SERVICE DO BACK-END
  enviarFormAtor(){
    this.atorService.editarAtor(this.atorEditado).subscribe({
      next: (data:any) => {
        this.atorEditado = data;
        this.goToRoute();
        this.alertServ.success('Editado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Edição não enviada.')
      }
    });
  }

  goToRoute(){
    this.router.navigate(['api/ator-create/editar']);
  }

  onSubmit() {
    console.log(this.atorform.valid);
    if(this.atorform.valid) {
      this.atorEditado = this.atorform.value;
      this.enviarFormAtor();
      this.atorform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
