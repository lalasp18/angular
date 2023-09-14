import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiretorComponent } from '../diretor.component';
// import { DiretoresComponent } from '../../../listar/atores/diretor.component';

const routes: Routes = [
  { path: 'api/diretor-create', redirectTo: 'cadastrar/diretor', pathMatch: 'full' },
  {
    path: 'cadastrar/diretor',
    component: DiretorComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  // { path: 'listar-diretores', component: DiretoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiretorRoutingModule { }
