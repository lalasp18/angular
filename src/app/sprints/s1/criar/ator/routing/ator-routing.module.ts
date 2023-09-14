import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtorComponent } from '../ator.component';
import { AtoresComponent } from '../../../listar/atores/atores.component';
import { AtorEditComponent } from '../../../editar/ator/ator-edit.component';

const routes: Routes = [
  { path: 'api/ator-create', redirectTo: 'cadastrar/ator', pathMatch: 'full' },
  { 
    path: 'cadastrar/ator', 
    component: AtorComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar-atores', component: AtoresComponent },
  { path: 'editar/ator', component: AtorEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtorRoutingModule { }
