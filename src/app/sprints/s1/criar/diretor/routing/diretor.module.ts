import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiretorComponent } from '../diretor.component';
import { DiretorService } from '../service/diretor.service';
import { DiretorRoutingModule } from './diretor-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';
import { DiretoresComponent } from '../../../listar/diretor/diretor.component';

@NgModule({
  declarations: [
    DiretorComponent,
    DiretoresComponent
  ],
  imports: [
    CommonModule,
    DiretorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    DiretorService,
    // FormDeactivateGuard,
    AlertService
  ],
  exports: [DiretorComponent]
})
export class DiretorModule { }
