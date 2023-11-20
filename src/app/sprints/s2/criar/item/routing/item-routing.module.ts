import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from '../item.component';
import { ItensComponent } from '../../../listar/itens/itens.component';
import { ItemEditComponent } from '../../../editar/item-edit/item-edit.component';


const routes: Routes = [
  { path: 'api/item/criar', redirectTo: 'cadastrar/item', pathMatch: 'full' },
  {
    path: 'cadastrar/item',
    component: ItemComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'api/item/listar', redirectTo: 'listar/item', pathMatch: 'full' },
  { path: 'listar/item', component: ItensComponent },

  { path: 'api/item/listar/:id', redirectTo: 'editar/item/:id', pathMatch: 'full' },
  { path: 'editar/item/:id', component: ItemEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
