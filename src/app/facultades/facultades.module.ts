import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultadesPageComponent } from './facultades-page/facultades-page.component';



@NgModule({
  declarations: [  
    FacultadesPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FacultadesPageComponent
  ]
})
export class FacultadesModule { }
