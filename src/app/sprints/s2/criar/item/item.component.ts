import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';

import { Item } from 'src/app/models/item.models';
import { ItemService } from './service/item.service';

@Component({
  selector: 'app-classe',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  itens: Item[] = [];
  itemform: FormGroup;

  staticAlertClosed = false;
  alertMessage: string | undefined;
  alertType: string | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertServ: AlertService,
    private itemService: ItemService
  ) {
    this.itemform = this.formBuilder.group({
      idItem: [null],
      numSerie: [null, [Validators.required, Validators.min(0)]],
      dtAquisicao: [null, [Validators.required]],
      tipoItem: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],

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
  enviarFormItem() {
    this.itemService.salvarItem(this.itens).subscribe({
      next: (data: any) => {
        this.itens = data;
        this.goToRoute();
        this.alertServ.success('Item cadastrado com sucesso!');
      },
      error: (err: any) => {
        this.alertServ.error('Cadastro não enviado.')
      }
    });
  }

  goToRoute() {
    this.router.navigate(['api/item-create']);
  }

  onSubmit() {
    console.log(this.itemform.value);
    if (this.itemform.valid) {
      this.itens = this.itemform.value;
      this.enviarFormItem();
      this.itemform.reset();
    } else {
      this.alertServ.warning('Informação inválida. Preencha o campo!')
    }
  }
}
