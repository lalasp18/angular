import { debounceTime, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';
import { Titulo } from 'src/app/models/titulo.models';
import { TituloService } from '../../criar/titulo/service/titulo.service';
import { Ator } from 'src/app/models/ator.models';
import { Classe } from 'src/app/models/classe.models';
import { Diretor } from 'src/app/models/diretor.models';
import { AtorService } from 'src/app/sprints/s1/criar/ator/service/ator.service';
import { ClasseService } from 'src/app/sprints/s1/criar/classe/service/classe.service';
import { DiretorService } from 'src/app/sprints/s1/criar/diretor/service/diretor.service';

@Component({
  selector: 'titulo-edit',
  templateUrl: './titulo-edit.component.html',
  styleUrls: ['./titulo-edit.component.scss']
})
export class TituloEditComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  tituloID!: Titulo;
  tituloEditado: Titulo[] = [];
  atorList: Ator[] = [];
  classeList: Classe[] = [];
  diretorList: Diretor[] = [];
  message: any;
  imagePath: any;
  imgURL: any;

  tituloform: FormGroup;
  unsubscribe$!: Subscription;

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
    private diretorService: DiretorService,
    private route: ActivatedRoute
  ) {
    this.tituloform = this.formBuilder.group({
      idTitulo: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      atores: this.formBuilder.array([null], [this.RequiredArrayValidator()]),
      diretor: [null, Validators.required],
      classe: [null, [Validators.required]],
      ano: [null, [Validators.required]],
      sinopse: [null, [Validators.required, Validators.maxLength(5000)]],
      categoria: [null, [Validators.required]],
      imagem: [null, [Validators.required]]
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
  addAtor(ator: Ator) {
    this.getAtor().push(new FormControl(ator));
    console.log(this.getAtor())
  }

  compareAtores(atorA: Ator, atorB: Ator): boolean {
    console.log('atorA: ',atorA)
    console.log('atorB: ',atorB)
    return atorA.idAtor === atorB.idAtor;
  }

  //  APAGA ELEMENTOS DE ARRAY PELO ÍNDICE INDICADO
  removeAtor(ator: Ator) {
    const atoresArray = this.getAtor();
    console.log(atoresArray)
    const index = atoresArray.controls.findIndex(control => this.compareAtores(control.value, ator));
    console.log('index do ator para remover',index)

    if (index !== -1) {
      atoresArray.removeAt(index);
    } else {
      console.error('Ator não encontrado no FormArray.');
    }
  }


  //  SALVA ELEMENTO E ÍNDICE NO ARRAY FORM
  // ator(e: any, id: number) {
  //   const selectedAtor = e.target.value;
  //   const atorSelecionado = this.atorList.find(x => x.nome === selectedAtor);
  //   if (atorSelecionado) {
  //     this.getAtor().at(id).setValue(atorSelecionado);
  //   }
  // }

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
          this.diretorList = data.reverse();

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


    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.tituloService.pegarIdTitulo(id)
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.tituloID = data;

          this.tituloform.get("idTitulo")?.setValue(this.tituloID.idTitulo);
          this.tituloform.get("nome")?.setValue(this.tituloID.nome);
          this.tituloform.get("ano")?.setValue(this.tituloID.ano);
          this.tituloform.get("sinopse")?.setValue(this.tituloID.sinopse);
          this.tituloform.get("categoria")?.setValue(this.tituloID.categoria);
          this.tituloform.get("imagem")?.patchValue(this.tituloID.imagem);
          this.tituloform.get("atores")?.setValue(this.tituloID.atores);
          this.tituloform.get("diretor")?.setValue(this.tituloID.diretor);
          this.tituloform.get("classe")?.setValue(this.tituloID.classe);

          this.imgURL = this.tituloID.imagem;

          for(let i = 0; i < this.atorList.length; i++) {
            for (let ator of this.tituloID.atores) {
              if(this.atorList[i].nome === ator.nome) {
                const dropAtor = document.getElementById("flexCheck"+i) as HTMLInputElement;
                dropAtor.checked = true;
              }
            }
          }
          const selectDiretor = document.getElementById('selectDiretor') as HTMLInputElement;
          selectDiretor.value = this.tituloID.diretor.idDiretor.toString();
          console.log(this.tituloID.diretor.nome)
          const selectClasse = document.getElementById('selectClasse') as HTMLInputElement;
          selectClasse.value = this.tituloID.classe.idClasse.toString();
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


  pegarAtores(evento: any, ator: Ator, index: number) {
    if (evento.target.checked) {
      console.log("entrou no evento com index:", index)
      console.log("entrou no evento com index:", ator)
      this.addAtor(ator)
      console.log(this.getAtor().value)
    } else {
      console.log("removeu da seleção com index:", index)
      this.removeAtor(ator)
      console.log(this.getAtor().value)
    }

  }

  pegarDiretor(event: any) {

    let diretorSelecionado = event.target.value;
    console.log("veio no evento target value:", event.target.value)
    console.log("veio no evento target:", event.target)

    if (diretorSelecionado) {
      this.diretorService.pegarIdDiretor(diretorSelecionado).subscribe({
        next: (dir: any) => {
          diretorSelecionado = dir;
          console.log("Diretor selecionado:", diretorSelecionado);
          this.tituloform.get("diretor")?.setValue(diretorSelecionado);

        }
      })

    }
  }


  pegarClasse(event: any) {

    let classeSelecionada = event.target.value;
    console.log("veio no evento target value:", event.target.value)
    console.log("veio no evento target:", event.target)

    if (classeSelecionada) {
      this.classeService.pegarIdClasse(classeSelecionada).subscribe({
        next: (clas: any) => {
          classeSelecionada = clas;
          console.log("Classeonado:", classeSelecionada);
          this.tituloform.get("classe")?.setValue(classeSelecionada);

        }
      })

    }
  }



  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }

  close() {
    this.alertMessage = '';
  }

  //  SALVA FORM PELO SERVICE DO BACK-END
  enviarFormTitulo() {
    this.tituloService.editarTitulo(this.tituloEditado).subscribe({
      next: (data: any) => {
        this.tituloEditado = data;
        this.goToRoute();
        this.alertServ.success('Título editado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Edição não enviada.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/titulo-create/editar']);
  }
  preview(files: any) {
    if (files.length === 0)
      return;

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Apenas Imagens são suportadas.";
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.tituloform.get('imagem')?.setValue(reader.result);
    }
  }


  onSubmit() {
    console.log(this.tituloform.value);
    if (this.tituloform.valid) {
      this.tituloEditado = this.tituloform.value;
      this.enviarFormTitulo();
      this.tituloform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
    this.imgURL = null;
    for (let i = 0; i < this.atorList.length; i++) {
      const selectAtor = document.getElementById(`flexCheck${i}`) as HTMLInputElement;
      if (selectAtor) {
        selectAtor.checked = false;
      }
    }

    const selectDiretor = document.getElementById('selectDiretor') as HTMLInputElement;
    selectDiretor.value = "Selecione um(a) Diretor(a)..";
    const selectClasse = document.getElementById('selectClasse') as HTMLInputElement;
    selectClasse.value = "Selecione uma Classe..";
  }
}
