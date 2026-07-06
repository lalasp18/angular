import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from '../cliente.component';
import { ClientesComponent } from '../../../listar/clientes/clientes.component';
import { ClienteEditComponent } from '../../../editar/cliente-edit/cliente-edit.component';


const routes: Routes = [
  { path: 'api/dependente/criar', redirectTo: 'cadastrar/cliente', pathMatch: 'full' },
  { path: 'api/socio/criar', redirectTo: 'cadastrar/cliente', pathMatch: 'full' },
  {
    path: 'cadastrar/cliente',
    component: ClienteComponent,
    // canActivate: [AuthGuard],
    // canDeactivate: [FormDeactivateGuard] 
  },
  { path: 'api/dependente/listar', redirectTo: 'listar/cliente', pathMatch: 'full' },
  { path: 'api/socio/listar', redirectTo: 'listar/cliente', pathMatch: 'full' },
  { path: 'listar/cliente', component: ClientesComponent },

  { path: 'api/socio/listar/:id', redirectTo: 'editar/socio/:id', pathMatch: 'full' },
  { path: 'editar/socio/:id', component: ClienteEditComponent },
  
  { path: 'api/dependente/listar/:id', redirectTo: 'editar/dependente/:id', pathMatch: 'full' },
  { path: 'editar/dependente/:id', component: ClienteEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
