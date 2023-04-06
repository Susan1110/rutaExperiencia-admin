import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasFrecuentesPageComponent } from './preguntas-frecuentes-page/preguntas-frecuentes-page.component';



@NgModule({
  declarations: [
    PreguntasFrecuentesPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PreguntasFrecuentesPageComponent
  ]
})
export class PreguntasFrecuentesModule { }
