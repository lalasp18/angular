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
  message: any;
  imagePath: any;
  imgURL: any;

  auxiliarAtor: any[] = [];

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
      sinopse: [null, [Validators.required, Validators.maxLength(5000)]],
      categoria: [null, [Validators.required]],
      imagem: [null, [Validators.required]]
    });
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

  //  APAGA ELEMENTOS DE ARRAY PELO ÍNDICE INDICADO
  removeAtor(i: number) {
    console.log(this.getAtor().at(i))
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


  pegarAtores(evento: any, ator: Ator, index: number) {
    if (evento.target.checked) {
      console.log("entrou no evento com index:", index)
      console.log("entrou no evento com index:", ator)
      this.addAtor(ator)
    } else {
      console.log("removeu da seleção com index:", index)
      this.removeAtor(index)
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


  // convertNameToObject() {
  //   this.tituloform.updateValueAndValidity();

  //   if (!this.tituloform.valid) {
  //     const atoresControl = this.auxiliarAtor;
  //     let auxRetornoAtor: any;
  //     for (let j = 0; j < atoresControl.length; j++) {

  //       console.log("Veio Ator id:", atoresControl[j].value)
  //       const id = atoresControl[j].value
  //       auxRetornoAtor = this.atorList.find(atoraux => atoraux.idAtor == id)
  //       console.log("Recebeu o retorno Ator:", auxRetornoAtor)

  //     }
  //     this.tituloform.get("atores")?.setValue(auxRetornoAtor);

  //     const diretoresControl = this.tituloform.get("diretor")?.value;
  //     const diretorvalue = diretoresControl.map((diretor: any) => {
  //       console.log("Veio Diretor id:", diretor.value)
  //       const id = diretor.value
  //       return this.diretorList.find(diretoraux => diretoraux.idDiretor == id)
  //     })

  //     this.tituloform.get("diretor")?.setValue(diretorvalue);

  //     const classesControl = this.tituloform.get("classe")?.value;
  //     const classevalue = classesControl.map((classe: any) => {
  //       console.log("Veio Classe id:", classe.value)
  //       const id = classe.value
  //       return this.classeList.find(classeaux => classeaux.idClasse == id)
  //     })

  //     this.tituloform.get("classe")?.setValue(classevalue);

  //   }

  // }

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
    // this.convertNameToObject();
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
