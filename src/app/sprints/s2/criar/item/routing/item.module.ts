import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';
import { ItemComponent } from '../item.component';
import { ItensComponent } from '../../../listar/itens/itens.component';
import { ItemEditComponent } from '../../../editar/item-edit/item-edit.component';
import { ItemService } from '../service/item.service';
import { ItemRoutingModule } from './item-routing.module';

@NgModule({
  declarations: [
    ItemComponent,
    ItensComponent,
    ItemEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ItemRoutingModule
  ],
  providers: [
    ItemService,
    // FormDeactivateGuard,
    AlertService
  ],
  exports:[ItemComponent]
})
export class ItemModule { }
