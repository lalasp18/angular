import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtorComponent } from '../ator.component';
import { AtorService } from '../service/ator.service';
import { AtorRoutingModule } from './ator-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/_services/alert.service';



@NgModule({
  declarations: [
    AtorComponent
  ],
  imports: [
    CommonModule,
    AtorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    AtorService,
    // FormDeactivateGuard,
    AlertService
  ],
  exports:[AtorComponent]
})
export class AtorModule { }
