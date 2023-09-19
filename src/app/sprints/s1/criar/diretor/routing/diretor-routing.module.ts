import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiretorComponent } from '../diretor.component';
import { DiretoresComponent } from '../../../listar/diretores/diretores.component';
import { DiretorEditComponent } from '../../../editar/diretor/diretor-edit.component';

const routes: Routes = [
  { path: 'api/diretor-create', redirectTo: 'cadastrar/diretor', pathMatch: 'full' },
  {
    path: 'cadastrar/diretor',
    component: DiretorComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar-diretores', component: DiretoresComponent },

  { path: 'api/diretor-create/:id', redirectTo: 'editar/diretor/:id', pathMatch: 'full' },
  { path: 'editar/diretor/:id', component: DiretorEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiretorRoutingModule { }
