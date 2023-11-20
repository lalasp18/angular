import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseComponent } from '../classe.component';
import { ClassesComponent } from '../../../listar/classes/classes.component';
import { ClasseEditComponent } from '../../../editar/classe/classe-edit.component';

const routes: Routes = [
  { path: 'api/classe/criar', redirectTo: 'cadastrar/classe', pathMatch: 'full' },
  {
    path: 'cadastrar/classe',
    component: ClasseComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'api/classe/listar', redirectTo: 'listar/classe', pathMatch: 'full' },
  { path: 'listar/classe', component: ClassesComponent },

  { path: 'api/classe/listar/:id', redirectTo: 'editar/classe/:id', pathMatch: 'full' },
  { path: 'editar/classe/:id', component: ClasseEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
