import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TituloComponent } from '../titulo.component';
import { TitulosComponent } from '../../../listar/titulos/titulos.component';
import { TituloEditComponent } from '../../../editar/titulo-edit/titulo-edit.component';

const routes: Routes = [
  { path: 'api/titulo-create', redirectTo: 'cadastrar/titulo', pathMatch: 'full' },
  { 
    path: 'cadastrar/titulo', 
    component: TituloComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar-itens', component: TitulosComponent },

  { path: 'api/titulo-create/:id', redirectTo: 'editar/titulo/:id', pathMatch: 'full' },
  { path: 'editar/titulo/:id', component: TituloEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TituloRoutingModule { }
