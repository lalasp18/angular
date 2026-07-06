import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteComponent } from '../cliente.component';
import { ClientesComponent } from '../../../listar/clientes/clientes.component';
import { ClienteEditComponent } from '../../../editar/cliente-edit/cliente-edit.component';
import { SocioService } from '../service/socio.service';
import { DependenteService } from '../service/dependente.service';
import { ClienteRoutingModule } from './cliente-routing.module';
import { AlertService } from 'src/app/_services/alert.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ClienteComponent,
    ClientesComponent,
    ClienteEditComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    SocioService,
    DependenteService,
    // FormDeactivateGuard,
    AlertService
  ],
  exports: [ClienteComponent]
})
export class ClienteModule { }
