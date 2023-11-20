import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocacaoComponent } from '../locacao.component';



const routes: Routes = [
  { path: 'api/locacao/criar', redirectTo: 'cadastrar/locacao', pathMatch: 'full' },

  {
    path: 'cadastrar/locacao',
    component: LocacaoComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'api/locacao/listar', redirectTo: 'listar/locacao', pathMatch: 'full' },


  { path: 'api/locacao/listar/:id', redirectTo: 'editar/locacao/:id', pathMatch: 'full' },

  { path: 'editar/locacao/:id', component: LocacaoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocacaoRoutingModule { }
