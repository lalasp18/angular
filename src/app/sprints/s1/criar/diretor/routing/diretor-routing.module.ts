import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiretorComponent } from '../diretor.component';

const routes: Routes = [
  { path: 'api/ator-create', redirectTo: 'cadastrar/ator', pathMatch: 'full' },
  {
    path: 'cadastrar/ator',
    component: DiretorComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiretorRoutingModule { }
