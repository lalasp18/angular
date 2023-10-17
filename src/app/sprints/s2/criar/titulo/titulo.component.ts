import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';
import { Titulo } from 'src/app/models/titulo.models';
import { TituloService } from './service/titulo.service';
import { Ator } from 'src/app/models/ator.models';
import { Diretor } from 'src/app/models/diretor.models';
import { Classe } from 'src/app/models/classe.models';
import { AtorService } from 'src/app/sprints/s1/criar/ator/service/ator.service';
import { ClasseService } from 'src/app/sprints/s1/criar/classe/service/classe.service';
import { DiretorService } from 'src/app/sprints/s1/criar/diretor/service/diretor.service';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  titulos: Titulo[] = [];
  atorList: Ator[] = [];
  diretorList: Diretor[] = [];
  classeList: Classe[] = [];
  tituloform: FormGroup;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private tituloService: TituloService,
    private atorSeruice: AtorService,
    private classeService: ClasseService,
    private diretorService: DiretorService
  ) {
    this.tituloform = this.formBuilder.group({
      idTitulo: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      atores: this.formBuilder.array([null, [this.RequiredArrayValidator()]]),
      diretor: [null, Validators.required],
      classe: [null, [Validators.required]],
      ano: [null, [Validators.required]],
      sinopse: [null, [Validators.required]],
      categoria: [null, [Validators.required]]
    });
  }

  RequiredArrayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const required = value && value.length > 0;
      return required ? null : { required: true }
    }
  }

  //  RETORNA ARRAY PARA O FORM PROJETO
  getAtor(): FormArray {
    return this.tituloform.get('atores') as FormArray;
  }



  //  ADICIONA NOVO ÍNDICE NOS ATRIBUTOS ARRAY
  addAtor() {
    this.getAtor().push(new FormControl());
  }

  //  APAGA ELEMENTOS DE ARRAY PELO ÍNDICE INDICADO
  removeAtor(i: number) {
    this.getAtor().removeAt(i);
  }


  //  SALVA ELEMENTO E ÍNDICE NO ARRAY FORM
  ator(e: any, id: number) {
    const selectedAtor = e.target.value;
    const atorSelecionado = this.atorList.find(x => x.nome === selectedAtor);
    if (atorSelecionado) {
      this.getAtor().at(id).setValue(atorSelecionado);
    }
  }

  ngOnInit() {
    this.atorSeruice.listarAtor().subscribe(
      {
        next: (data: any) => {
          this.atorList = data.reverse();
        },
        error: (err: any) => {

        }
      }
    )

    this.diretorService.listarDiretor().subscribe(
      {
        next: (data: any) => {
          this.diretorList = data.rseverse();
        },
        error: (err: any) => {

        }
      }
    )

    this.classeService.listarClasse().subscribe(
      {
        next: (data: any) => {
          this.classeList = data.reverse();
        },
        error: (err: any) => {

        }
      }
    )



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
  enviarFormTitulo() {
    this.tituloService.salvarTitulo(this.titulos).subscribe({
      next: (data: any) => {
        this.titulos = data;
        this.goToRoute();
        this.alertServ.success('Titulo cadastrado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/titulo-create']);
  }

  onSubmit() {
    console.log(this.tituloform.value);
    if (this.tituloform.valid) {
      this.titulos = this.tituloform.value;
      this.enviarFormTitulo();
      this.tituloform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
