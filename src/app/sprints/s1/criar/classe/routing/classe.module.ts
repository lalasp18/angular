import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClasseComponent } from '../classe.component';
import { ClasseService } from '../service/classe.service';
import { ClasseRoutingModule } from './classe-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';



@NgModule({
  declarations: [
    ClasseComponent
  ],
  imports: [
    CommonModule,
    ClasseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    ClasseService,
    // FormDeactivateGuard,
    AlertService
  ],
  exports: [ClasseComponent]
})
export class ClasseModule { }
