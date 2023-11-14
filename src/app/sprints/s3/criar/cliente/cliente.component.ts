import { debounceTime, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Dependente, Socio } from 'src/app/models/cliente.models';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { SocioService } from './service/socio.service';
import { DependenteService } from './service/dependente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  clienteSocio: Socio[] = [];
  clienteDependente: Dependente[] = [];
  formularioSocio: FormGroup;
  formularioDependente: FormGroup;
  message: any;

  listagemClienteDependente: Dependente[] = [];
  unsubscribe$!: Subscription;
  showForm:boolean = true;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private socioService: SocioService,
    private dependenteService: DependenteService,
  ) {
    this.formularioSocio = this.formBuilder.group({
      numInscricao: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      dtNascimento: [null, Validators.required],
      sexo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      estahAtivo: [null, [Validators.required]],
      cpf: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      endereco: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      tel: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      dependentes: this.formBuilder.array([], [Validators.required])
    });

    this.formularioDependente = this.formBuilder.group({
      numInscricao: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      dtNascimento: [null, Validators.required],
      sexo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      estahAtivo: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.unsubscribe$ = this.dependenteService.listarDependente().subscribe({
      next: (itens) => {
      const data = itens;
      this.listagemClienteDependente = data;
      },
      error: (err: any) => {
        this.alertServ.error('Opções para dependente não foram encontrados! Servidor não está respondendo.')
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

  ngOnDestroy(): void {
    this.unsubscribe$.unsubscribe();
  }

  close() {
    this.alertMessage = '';
  }

  onChange(event: any) {
    if (event.target.id === 'flexRadioRede') {
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }

  getDependente(): FormArray {
    return this.formularioSocio.get('dependentes') as FormArray;
  }

  addDependente(dependente: Dependente) {
    this.getDependente().push(new FormControl(dependente));
    console.log(this.getDependente())
  }

  pegarDependentes(evento: any, dependente: Dependente, index: number) {
    if (evento.target.checked) {
      console.log("entrou no evento com index:", index)
      console.log("entrou no evento com index:", dependente)
      this.addDependente(dependente)
      console.log(this.getDependente().value)
    } else {
      console.log("removeu da seleção com index:", index)
      this.removeDependente(dependente)
      console.log(this.getDependente().value)
    }
  }

  removeDependente(dependente: Dependente) {
    const dependentesArray = this.getDependente();
    const index = dependentesArray.controls.findIndex(control => control.value === dependente);
    console.log('index do dependente para remover',index)

    if (index !== -1) {
      dependentesArray.removeAt(index);
    } else {
      console.error('Dependente não encontrado no FormArray.');
    }
  }

  enviarFormSocio() {
    this.socioService.salvarSocio(this.clienteSocio).subscribe({
      next: (data: any) => {
        this.clienteSocio = data;
        this.goToRoute();
        this.alertServ.success('Cliente cadastrado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/cliente/criar']);
  }
  
  onSubmit() {
    if (this.formularioSocio.valid) {
      this.clienteSocio = this.formularioSocio.value;
      this.enviarFormSocio();
      this.formularioSocio.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
    
    // for (let i = 0; i < this.atorList.length; i++) {
    //   const selectAtor = document.getElementById(`flexCheck${i}`) as HTMLInputElement;
    //   if (selectAtor) {
    //     selectAtor.checked = false;
    //   }
    // }
    
    const selectDiretor = document.getElementById('selectDiretor') as HTMLInputElement;
    selectDiretor.value = "Selecione um(a) Diretor(a)..";
    const selectClasse = document.getElementById('selectClasse') as HTMLInputElement;
    selectClasse.value = "Selecione uma Classe..";
  }
}
