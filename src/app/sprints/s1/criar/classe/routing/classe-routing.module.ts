import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseComponent } from '../classe.component';
import { ClassesComponent } from '../../../listar/classes/classes.component';
import { ClasseEditComponent } from '../../../editar/classe/classe-edit.component';

const routes: Routes = [
  { path: 'api/classe-create', redirectTo: 'cadastrar/classe', pathMatch: 'full' },
  {
    path: 'cadastrar/classe',
    component: ClasseComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'listar-classes', component: ClassesComponent },

  { path: 'editar/classe', component: ClasseEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
