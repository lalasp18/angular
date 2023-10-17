import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from '../item.component';


const routes: Routes = [
  { path: 'api/item-create', redirectTo: 'cadastrar/item', pathMatch: 'full' },
  {
    path: 'cadastrar/item',
    component: ItemComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar-itens', component: ItemComponent },

  { path: 'api/item-create/:id', redirectTo: 'editar/item/:id', pathMatch: 'full' },
  { path: 'editar/item/:id', component: ItemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
