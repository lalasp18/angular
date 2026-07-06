import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocacaoComponent } from '../locacao.component';
import { LocacaoPendenteComponent } from '../../../listar/locacao-pendente/locacao-pendente.component';
import { LocacaoDevolvidaComponent } from '../../../listar/locacao-devolvida/locacao-devolvida.component';



const routes: Routes = [
  { path: 'api/locacao/criar', redirectTo: 'cadastrar/locacao', pathMatch: 'full' },

  {
    path: 'cadastrar/locacao',
    component: LocacaoComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'api/locacao/listar/pendente', redirectTo: 'listar-pendentes/locacao', pathMatch: 'full' },
  { path: 'listar-pendentes/locacao', component: LocacaoPendenteComponent },

  { path: 'api/locacao/listar/devolvida', redirectTo: 'listar-devolvida/locacao', pathMatch: 'full' },
  { path: 'listar-devolvida/locacao', component: LocacaoDevolvidaComponent },


  { path: 'api/locacao/listar/:id', redirectTo: 'editar/locacao/:id', pathMatch: 'full' },

  { path: 'editar/locacao/:id', component: LocacaoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocacaoRoutingModule { }
