import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, debounceTime } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { Dependente, Socio } from 'src/app/models/cliente.models';
import { SocioService } from '../../criar/cliente/service/socio.service';
import { DependenteService } from '../../criar/cliente/service/dependente.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss']
})
export class ClienteEditComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  clienteSocio: Socio[] = [];
  clienteDependente: Dependente[] = [];
  formularioSocio: FormGroup;
  formularioDependente: FormGroup;

  listagemClienteDependente: Dependente[] = [];
  unsubscribe$!: Subscription;
  showForm:boolean = true;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  message: any;
  imagePath: any;
  imgURL: any;

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
      estahAtivo: [1, [Validators.required]],
      cpf: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      endereco: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      tel: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      dependentes: this.formBuilder.array([], [Validators.required]),
      imagem: [null, Validators.required],
    });
    
    this.formularioDependente = this.formBuilder.group({
      numInscricao: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      dtNascimento: [null, Validators.required],
      sexo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      estahAtivo: [1, [Validators.required]],
      imagem: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.unsubscribe$ = this.dependenteService.listarDependente().subscribe({
      next: (itens) => {
      this.listagemClienteDependente = itens;
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
      this.ngOnInit();
      // window.location.reload();
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
      console.log('size = ', this.getDependente().length <= 3)
      if (this.getDependente().length < 3) {
        console.log("entrou no evento com index:", index)
        console.log("entrou no evento com index:", dependente)
        this.addDependente(dependente)
        console.log(this.getDependente().value)
      } else {
        alert("Você já tem 3 dependentes selecionados. Não é possível adicionar mais.");
        console.log('evento antes -> ',evento.target.checked)
        evento.target.checked = false;
        console.log('evento depois -> ',evento.target.checked)
      }
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

  preview(files: any) {
    if (files.length === 0)
      return;
  
    const maxSizeInBytes = 2 * 1024 * 1024; // Tamanho máximo em bytes (1MB, por exemplo)
    if (files[0].size > maxSizeInBytes) {
      this.message = "A imagem é muito grande. O tamanho máximo permitido é 2MB.";
      alert(this.message);
      return;
    }

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Apenas Imagens são suportadas.";
      alert(this.message);
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      if(this.showForm){
        this.formularioDependente.get('imagem')?.setValue(reader.result);
      } else {
        this.formularioSocio.get('imagem')?.setValue(reader.result);
      }
    }
  }

  enviarFormSocio() {
    this.socioService.salvarSocio(this.clienteSocio).subscribe({
      next: (data: any) => {
        this.clienteSocio = data;
        this.goToRouteS();
        this.alertServ.success('Cliente cadastrado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRouteS() {
    this.router.navigate(['api/socio/criar']);
  }

  enviarFormDependente() {
    this.dependenteService.salvarDependente(this.clienteDependente).subscribe({
      next: (data: any) => {
        this.clienteDependente = data;
        this.goToRouteD();
        this.alertServ.success('Cliente cadastrado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRouteD() {
    this.router.navigate(['api/dependente/criar']);
  }
  
  onSubmit() {
    this.formularioSocio.get('estahAtivo')?.setValue(1)
    this.formularioDependente.get('estahAtivo')?.setValue(1)
    if (this.formularioSocio.valid) {
      this.clienteSocio = this.formularioSocio.value;
      // this.enviarFormSocio();
      // this.formularioSocio.reset();
    
      for (let i = 0; i < this.listagemClienteDependente.length; i++) {
        const selectDependente = document.getElementById(`flexCheck${i}`) as HTMLInputElement;
        if (selectDependente) {
          selectDependente.checked = false;
        }
      }
      
      while(this.getDependente().length !== 0) {
        this.getDependente().removeAt(0)
      }
      this.imgURL=null;
      this.ngOnInit();
    } else if (this.formularioDependente.valid) {
      this.clienteDependente = this.formularioDependente.value;
      // this.enviarFormDependente();
      // this.formularioDependente.reset();
      this.imgURL=null;
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
