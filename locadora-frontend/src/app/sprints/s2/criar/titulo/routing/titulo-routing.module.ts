import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TituloComponent } from '../titulo.component';
import { TitulosComponent } from '../../../listar/titulos/titulos.component';
import { TituloEditComponent } from '../../../editar/titulo-edit/titulo-edit.component';
import { BuscaTitulosComponent } from 'src/app/sprints/s4/busca-titulos/busca-titulos.component';

const routes: Routes = [
  { path: 'api/titulo/criar', redirectTo: 'cadastrar/titulo', pathMatch: 'full' },
  {
    path: 'cadastrar/titulo',
    component: TituloComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'api/titulo/listar', redirectTo: 'listar/titulo', pathMatch: 'full' },
  { path: 'listar/titulo', component: TitulosComponent },
  
  { path: 'api/titulo/listar/:id', redirectTo: 'editar/titulo/:id', pathMatch: 'full' },
  { path: 'editar/titulo/:id', component: TituloEditComponent },
  
  // { path: 'api/titulo/listar', redirectTo: 'listar/titulo', pathMatch: 'full' },
  { path: 'buscar/titulo', component: BuscaTitulosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TituloRoutingModule { }
