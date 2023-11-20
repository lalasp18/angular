import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtorModule } from './sprints/s1/criar/ator/routing/ator.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './sprints/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxMaskDirective } from 'ngx-mask';
import { AlertService } from './_services/alert.service';
import { ClasseModule } from './sprints/s1/criar/classe/routing/classe.module';
import { DiretorModule } from './sprints/s1/criar/diretor/routing/diretor.module';
import { TituloModule } from './sprints/s2/criar/titulo/routing/titulo.module';
import { ItemModule } from './sprints/s2/criar/item/routing/item.module';
import { ClienteModule } from './sprints/s3/criar/cliente/routing/cliente.module';
import { LocacaoComponent } from './sprints/s3/criar/locacao/locacao.component';
import { LocacaoEditComponent } from './sprints/s3/editar/locacao-edit/locacao-edit.component';
import { LocacoesComponent } from './sprints/s3/listar/locacoes/locacoes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    LocacaoComponent,
    LocacaoEditComponent,
    LocacoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    // NgxMaskDirective,

    AtorModule,
    ClasseModule,
    DiretorModule,

    TituloModule,
    ItemModule,

    ClienteModule
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
