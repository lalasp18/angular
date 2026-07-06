import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  clienteSocioID!: Socio;
  clienteDependente: Dependente[] = [];
  clienteDependenteID!: Dependente;
  formularioSocio: FormGroup;
  formularioDependente: FormGroup;

  listagemClienteDependente: Dependente[] = [];
  unsubscribe$!: Subscription;
  unsubscribeSoc$!: Subscription;
  unsubscribeDep$!: Subscription;

  showForm:boolean = true;
  showSpinner:boolean = false;

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
    private route: ActivatedRoute
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

    const id = + this.route.snapshot.paramMap.get('id')!;
    const url = window.location.href;
    
    if (url.includes('socio')) {
      this.showForm = false;
      const radioElementS = document.getElementById("flexRadioOrienta") as HTMLInputElement;
      radioElementS.checked = true;
      radioElementS.disabled = true;

      const radioElementD = document.getElementById("flexRadioRede") as HTMLInputElement;
      radioElementD.checked = false;
      radioElementD.disabled = true;

      this.unsubscribeSoc$ = this.socioService.pegarIdSocio(id).subscribe({
        next: (itens) => {
          this.clienteSocioID = itens;

          this.formularioSocio.get("numInscricao")?.setValue(this.clienteSocioID.numInscricao);
          this.formularioSocio.get("nome")?.setValue(this.clienteSocioID.nome);
          this.formularioSocio.get("dtNascimento")?.setValue(this.clienteSocioID.dtNascimento);
          this.formularioSocio.get("sexo")?.setValue(this.clienteSocioID.sexo);
          this.formularioSocio.get("estahAtivo")?.setValue(this.clienteSocioID.estahAtivo);
          this.formularioSocio.get("cpf")?.setValue(this.clienteSocioID.cpf);
          this.formularioSocio.get("endereco")?.setValue(this.clienteSocioID.endereco);
          this.formularioSocio.get("tel")?.setValue(this.clienteSocioID.tel);
          this.formularioSocio.get("imagem")?.setValue(this.clienteSocioID.imagem);

          this.imgURL = this.clienteSocioID.imagem;
          if(this.clienteSocioID.dependentes) {
            for (const obj of this.clienteSocioID.dependentes) {
              this.addDependente(obj);
              this.listagemClienteDependente.push(obj);
            }
          }

          this.showSpinner = true;
          setTimeout(() => {
            if(this.clienteSocioID.dependentes) {
              for(let i = 0; i < this.listagemClienteDependente.length; i++) {
                for (let depende of this.clienteSocioID.dependentes) {
                  if(this.listagemClienteDependente[i].numInscricao === depende.numInscricao) {
                    if (document.getElementById("flexCheck" + i) !== null) {
                      const drop = document.getElementById("flexCheck" + i) as HTMLInputElement;
                      drop.checked = true;
                      this.showSpinner = false;
                    }
                  }
                }
              }
            } else {this.showSpinner = false;return}
          }, 5000);
        },
        error: (err: any) => {
          this.alertServ.error('Opções para dependente não foram encontrados! Servidor não está respondendo.')
        }
      });
    } else if (url.includes('dependente')) {
      this.showForm = true;
      const radioElementD = document.getElementById("flexRadioRede") as HTMLInputElement;
      radioElementD.checked = true;
      radioElementD.disabled = true;

      const radioElementS = document.getElementById("flexRadioOrienta") as HTMLInputElement;
      radioElementS.checked = false;
      radioElementS.disabled =true;

      this.unsubscribeDep$ = this.dependenteService.pegarIdDependente(id).subscribe({
        next: (itens) => {
          this.clienteDependenteID = itens;

          this.formularioDependente.get("numInscricao")?.setValue(this.clienteDependenteID.numInscricao);
          this.formularioDependente.get("nome")?.setValue(this.clienteDependenteID.nome);
          this.formularioDependente.get("dtNascimento")?.setValue(this.clienteDependenteID.dtNascimento);
          this.formularioDependente.get("sexo")?.setValue(this.clienteDependenteID.sexo);
          this.formularioDependente.get("estahAtivo")?.setValue(this.clienteDependenteID.estahAtivo);
          this.formularioDependente.get("imagem")?.setValue(this.clienteDependenteID.imagem);

          this.imgURL = this.clienteDependenteID.imagem;
        },
        error: (err: any) => {
          this.alertServ.error('Opções para dependente não foram encontrados! Servidor não está respondendo.')
        }
      });
    }

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
    if(this.unsubscribeSoc$){this.unsubscribeSoc$.unsubscribe()};
    if(this.unsubscribeDep$){this.unsubscribeDep$.unsubscribe()};
  }

  close() {
    this.alertMessage = '';
  }

  getDependente(): FormArray {
    return this.formularioSocio.get('dependentes') as FormArray;
  }

  addDependente(dependente: Dependente) {
    this.getDependente().push(new FormControl(dependente));
  }

  pegarDependentes(evento: any, dependente: Dependente, index: number) {
    if (evento.target.checked) {
      if (this.getDependente().length < 3) {
        this.addDependente(dependente)
      } else {
        alert("Você já tem 3 dependentes selecionados. Não é possível adicionar mais.");
        evento.target.checked = false;
      }
    } else {
      this.removeDependente(dependente)
    }
  }

  removeDependente(dependente: Dependente) {
    const dependentesArray = this.getDependente();
    const index = dependentesArray.controls.findIndex(control => control.value === dependente);

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

  updateFormSocio() {
    this.socioService.editarSocio(this.clienteSocio).subscribe({
      next: (data: any) => {
        this.clienteSocio = data;
        this.goToRouteS();
        this.alertServ.success('Cliente editado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRouteS() {
    this.router.navigate(['api/socio/editar']);
  }

  updateFormDependente() {
    this.dependenteService.editarDependente(this.clienteDependente).subscribe({
      next: (data: any) => {
        this.clienteDependente = data;
        this.goToRouteD();
        this.alertServ.success('Cliente editado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRouteD() {
    this.router.navigate(['api/dependente/editar']);
  }
  
  onSubmit() {
    if (this.formularioSocio.valid) {
      this.clienteSocio = this.formularioSocio.value;
      this.updateFormSocio();
      this.formularioSocio.reset();
    
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
    } else if (this.formularioDependente.valid) {
      this.clienteDependente = this.formularioDependente.value;
      this.updateFormDependente();
      this.formularioDependente.reset();
      this.imgURL=null;
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
