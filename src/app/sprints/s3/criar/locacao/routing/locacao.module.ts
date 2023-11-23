import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertService } from 'src/app/_services/alert.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocacaoComponent } from '../locacao.component';
import { LocacaoEditComponent } from '../../../editar/locacao-edit/locacao-edit.component';
import { LocacaoRoutingModule } from './locacao-routing.module';
import { LocacaoService } from '../service/locacao.service';
import { LocacaoDevolvidaComponent } from '../../../listar/locacao-devolvida/locacao-devolvida.component';
import { LocacaoPendenteComponent } from '../../../listar/locacao-pendente/locacao-pendente.component';

@NgModule({
  declarations: [
    LocacaoComponent,
    LocacaoEditComponent,
    LocacaoDevolvidaComponent,
    LocacaoPendenteComponent
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
