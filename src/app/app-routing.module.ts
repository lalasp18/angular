import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AtorComponent } from './s#1/criar/ator/ator.component';
import { ClasseComponent } from './s#1/criar/classe/classe.component';
import { DiretorComponent } from './s#1/criar/diretor/diretor.component';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'ator-control', component: AtorComponent },
  { path: 'classe-control', component: ClasseComponent },
  { path: 'diretor-control', component: DiretorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
