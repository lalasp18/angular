import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseComponent } from '../classe.component';

const routes: Routes = [
  { path: 'api/classe-create', redirectTo: 'cadastrar/classe', pathMatch: 'full' },
  {
    path: 'cadastrar/classe',
    component: ClasseComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
