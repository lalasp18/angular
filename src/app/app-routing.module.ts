import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './sprints/home/home.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  // { path: 'ator-control', component: AtorComponent },
  // { path: 'classe-control', component: ClasseComponent },
  // { path: 'diretor-control', component: DiretorComponent },

  
  { path: 'ator', 
    loadChildren:() => import('./sprints/s1/criar/ator/routing/ator.module').then(m => m.AtorModule)
  },
  { path: 'classe', 
    loadChildren:() => import('./sprints/s1/criar/classe/routing/classe.module').then(m => m.ClasseModule)
  },
  { path: 'diretor', 
    loadChildren:() => import('./sprints/s1/criar/diretor/routing/diretor.module').then(m => m.DiretorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
