import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertService } from 'src/app/_services/alert.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocacaoComponent } from '../locacao.component';
import { LocacoesComponent } from '../../../listar/locacoes/locacoes.component';
import { LocacaoEditComponent } from '../../../editar/locacao-edit/locacao-edit.component';
import { LocacaoRoutingModule } from './locacao-routing.module';
import { LocacaoService } from '../service/locacao.service';

@NgModule({
  declarations: [
    LocacaoComponent,
    LocacoesComponent,
    LocacaoEditComponent
  ],
  imports: [
    CommonModule,
    LocacaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    LocacaoService,
    // FormDeactivateGuard,
    AlertService
  ],
  exports: [LocacaoComponent]
})
export class LocacaoModule { }
