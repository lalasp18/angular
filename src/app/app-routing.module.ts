import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './sprints/home/home.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  // { path: 'ator-control', component: AtorComponent },
  // { path: 'classe-control', component: ClasseComponent },
  // { path: 'diretor-control', component: DiretorComponent },

  
  // { path: 'ator', 
    // loadChildren:() => import('./s#1/criar/ator/routing/ator.module').then(m => m.AtorModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
