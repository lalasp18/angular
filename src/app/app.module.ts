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
import { AlertService } from './_services/alert.service';
import { ClasseComponent } from './sprints/s1/criar/classe/classe.component';
import { DiretorComponent } from './sprints/s1/criar/diretor/diretor.component';
import { AtorComponent } from './sprints/s1/editar/ator/ator.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    ClasseComponent,
    DiretorComponent,
    AtorComponent
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

    AtorModule,
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
