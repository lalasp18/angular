import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';
import { Cliente, Dependente, Socio } from 'src/app/models/cliente.models';
import { Item } from 'src/app/models/item.models';
import { LocacaoService } from './service/locacao.service';
import { ItemService } from 'src/app/sprints/s2/criar/item/service/item.service';
import { DependenteService } from '../cliente/service/dependente.service';
import { SocioService } from '../cliente/service/socio.service';
import { Locacao } from 'src/app/models/locacao.models';

@Component({
  selector: 'app-locacao',
  templateUrl: './locacao.component.html',
  styleUrls: ['./locacao.component.scss']
})
export class LocacaoComponent implements OnInit {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  dependenteList: Dependente[] = [];
  socioList: Socio[] = [];
  itemList: Item[] = [];
  locacaoform: FormGroup;
  locacao: Locacao[] = [];
  message: any;

  showForm: boolean = true;

  auxiliarItem: any[] = [];

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private locacaoService: LocacaoService,
    private itemService: ItemService,
    private dependenteService: DependenteService,
    private socioService: SocioService
  ) {
    this.locacaoform = this.formBuilder.group({
      idLocacao: [null],
      dtLocacao: [null, [Validators.required,]],
      dtDevolucaoPrevista: [null, [Validators.required,]],
      valorCobrado: [null, [Validators.required]],
      item: [null, [Validators.required]],
      cliente: [null, Validators.required],
    });
  }

  RequiredArrayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const required = value && value.length > 0;
      return required ? null : { required: true }
    }
  }



  ngOnInit() {
    this.socioService.listarSocioAtivoESemMulta().subscribe(
      {
        next: (data: any) => {
          this.socioList = data.reverse();
        },
        error: (err: any) => {

        }
      }
    )

    this.dependenteService.listarDependenteESemMulta().subscribe(
      {
        next: (data: any) => {
          this.dependenteList = data.reverse();

        },
        error: (err: any) => {

        }
      }
    )

    this.itemService.listarItemSemLocacao().subscribe(
      {
        next: (data: any) => {
          this.itemList = data.reverse();
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


  onChange(event: any) {
    if (event.target.id === 'flexRadioRede') {
      this.showForm = true;
    } else {
      this.showForm = false;
      this.ngOnInit();
      // window.location.reload();
    }
  }

  pegarDependente(event: any) {

    let dependeSelecionado = event.target.value;
    console.log("veio no evento target value:", event.target.value)
    console.log("veio no evento target:", event.target)

    if (dependeSelecionado) {
      this.dependenteService.pegarIdDependente(dependeSelecionado).subscribe({
        next: (dir: any) => {
          dependeSelecionado = dir;
          console.log("Depende selecionado:", dependeSelecionado);
          this.locacaoform.get("cliente")?.setValue(dependeSelecionado);

        }
      })

    }
  }

  pegarSocio(event: any) {

    let socioSelecionado = event.target.value;
    console.log("veio no evento target value:", event.target.value)
    console.log("veio no evento target:", event.target)

    if (socioSelecionado) {
      this.socioService.pegarIdSocio(socioSelecionado).subscribe({
        next: (dir: any) => {
          socioSelecionado = dir;
          console.log("Sócio selecionado:", socioSelecionado);
          this.locacaoform.get("cliente")?.setValue(socioSelecionado);

        }
      })

    }
  }

  pegarItem(event: any) {

    let itemSelecionado = event.target.value;
    console.log("veio no evento target value:", event.target.value)
    console.log("veio no evento target:", event.target)

    if (itemSelecionado) {
      this.itemService.pegarIdItem(itemSelecionado).subscribe({
        next: (dir: any) => {
          itemSelecionado = dir;
          console.log("Item selecionado:", itemSelecionado);
          this.locacaoform.get("item")?.setValue(itemSelecionado);

        }
      })

    }
  }



  //  SALVA FORM PELO SERVICE DO BACK-END
  enviarFormLocacao() {

    this.locacaoService.salvarLocacao(this.locacao).subscribe({
      next: (data: any) => {
        this.locacao = data;
        this.goToRoute();
        this.alertServ.success('Locação cadastrado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/locacao/criar']);
  }

  onSubmit() {
    // this.convertNameToObject();
    console.log(this.locacaoform.value);
    if (this.locacaoform.valid) {
      this.locacao = this.locacaoform.value;
      this.enviarFormLocacao();
      this.locacaoform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }

    const selectDependente = document.getElementById('selectDependente') as HTMLInputElement;
    if (selectDependente) { selectDependente.value = "Selecione um Dependente..."; }
    const selectSocio = document.getElementById('selectSocio') as HTMLInputElement;
    if (selectSocio) { selectSocio.value = "Selecione uma Sócio..."; }
  }
}
