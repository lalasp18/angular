import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseComponent } from '../Classe.component';

const routes: Routes = [
  { path: 'api/Classe-create', redirectTo: 'cadastrar/Classe', pathMatch: 'full' },
  {
    path: 'cadastrar/Classe',
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
