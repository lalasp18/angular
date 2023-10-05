import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from '../item.component';
import { ItensComponent } from '../../../listar/itens/itens.component';
import { ItemEditComponent } from '../../../editar/item-edit/item-edit.component';

const routes: Routes = [
  { path: 'api/item-create', redirectTo: 'cadastrar/item', pathMatch: 'full' },
  { 
    path: 'cadastrar/item', 
    component: ItemComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar-itens', component: ItensComponent },

  { path: 'api/item-create/:id', redirectTo: 'editar/item/:id', pathMatch: 'full' },
  { path: 'editar/item/:id', component: ItemEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
