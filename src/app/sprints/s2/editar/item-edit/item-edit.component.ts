import { debounceTime, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';
import { Item } from 'src/app/models/item.models';
import { ItemService } from '../../criar/item/service/item.service';
import { Titulo } from 'src/app/models/titulo.models';
import { TituloService } from '../../criar/titulo/service/titulo.service';

@Component({
  selector: 'item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit, OnDestroy {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  itemID!: Item;
  itemEditado: Item[] = [];
  tituloList: Titulo[] = [];

  itemform: FormGroup;
  unsubscribe$!: Subscription;
  selectedTitulo:any;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private itemService: ItemService,
    private tituloService: TituloService,
    private route: ActivatedRoute,
    private el: ElementRef, private renderer: Renderer2
  ) {
    this.itemform = this.formBuilder.group({
      idItem: [null],
      numSerie: [null, [Validators.required, Validators.min(0)]],
      dtAquisicao: [null, [Validators.required]],
      tipoItem: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      titulo: [null, [Validators.required]]
    });
  }

  ngOnInit() {

    this.tituloService.listarTitulo().subscribe(
      {
        next: (data: any) => {
          this.tituloList = data.reverse();
        },
        error: (err: any) => {

        }
      }
    )


    const id = + this.route.snapshot.paramMap.get('id')!;

    this.unsubscribe$ = this.itemService.pegarIdItem(id)
      .subscribe({
        next: (itens: any) => {
          const data = itens;
          this.itemID = data;

          this.itemform.get("idItem")?.setValue(this.itemID.idItem);
          this.itemform.get("numSerie")?.setValue(this.itemID.numSerie);
          this.itemform.get("dtAquisicao")?.setValue(this.itemID.dtAquisicao);
          this.itemform.get("tipoItem")?.setValue(this.itemID.tipoItem);
          this.itemform.get("titulo")?.setValue(this.itemID.titulo);
          
          const selectTitulo = document.getElementById('selectTitulo') as HTMLInputElement;
          selectTitulo.value = this.itemID.titulo.idTitulo.toString();
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



  pegarTitulo(event: any) {

    let tituloSelecionado = event.target.value;
    console.log("veio no evento target value:", event.target.value)
    console.log("veio no evento target:", event.target)

    if (tituloSelecionado) {
      this.tituloService.pegarIdTitulo(tituloSelecionado).subscribe({
        next: (titulo: any) => {
          tituloSelecionado = titulo;
          console.log("Titulo selecionado:", tituloSelecionado);
          this.itemform.get("titulo")?.setValue(tituloSelecionado);

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
  enviarFormItem() {
    this.itemService.editarItem(this.itemEditado).subscribe({
      next: (data: any) => {
        this.itemEditado = data;
        this.goToRoute();
        this.alertServ.success('Item editado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Edição não enviada.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/item-create/editar']);
  }

  onSubmit() {
    console.log(this.itemform.value);
    if (this.itemform.valid) {
      this.itemEditado = this.itemform.value;
      this.enviarFormItem();
      this.itemform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
