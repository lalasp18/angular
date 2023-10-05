import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TituloRoutingModule } from './titulo-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';
import { TituloComponent } from '../titulo.component';
import { TitulosComponent } from '../../../listar/titulos/titulos.component';
import { TituloEditComponent } from '../../../editar/titulo-edit/titulo-edit.component';
import { TituloService } from '../service/titulo.service';

@NgModule({
  declarations: [
    TituloComponent,
    TitulosComponent,
    TituloEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TituloRoutingModule
  ],
  providers: [
    TituloService,
    // FormDeactivateGuard,
    AlertService
  ],
  exports:[TituloComponent]
})
export class TituloModule { }
