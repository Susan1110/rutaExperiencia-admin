import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrerasPageComponent } from './carreras-page/carreras-page.component';



@NgModule({
  declarations: [
    CarrerasPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CarrerasPageComponent
  ]
})
export class CarrerasModule { }
