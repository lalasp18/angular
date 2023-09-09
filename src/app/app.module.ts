import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavHeaderComponent } from './nav-header/nav-header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { AtorComponent } from './s#1/criar/ator/ator.component';
import { ClasseComponent } from './s#1/criar/classe/classe.component';
import { DiretorComponent } from './s#1/criar/diretor/diretor.component';

@NgModule({
  declarations: [
    AppComponent,
    AtorComponent,
    ClasseComponent,
    DiretorComponent,
    NavHeaderComponent,
    FooterComponent,
    HomeComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
