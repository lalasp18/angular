import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtorComponent } from '../ator.component';
import { AtoresComponent } from '../../../listar/atores/atores.component';
import { AtorEditComponent } from '../../../editar/ator-edit/ator-edit.component';

const routes: Routes = [
  { path: 'api/ator/criar', redirectTo: 'cadastrar/ator', pathMatch: 'full' },
  { 
    path: 'cadastrar/ator', 
    component: AtorComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'api/ator/listar', redirectTo: 'listar/ator', pathMatch: 'full' },
  { path: 'listar/ator', component: AtoresComponent },

  { path: 'api/ator/listar/:id', redirectTo: 'editar/ator/:id', pathMatch: 'full' },
  { path: 'editar/ator/:id', component: AtorEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtorRoutingModule { }
