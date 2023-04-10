import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaExperienciaPageComponent } from './ruta-experiencia-page/ruta-experiencia-page.component';
import { CiclosComponent } from './ciclos/ciclos.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';
import { BeneficiosComponent } from './beneficios/beneficios.component';
import { ListBeneficiosComponent } from './beneficios/list-beneficios/list-beneficios.component';
import { AddEditBeneficiosComponent } from './beneficios/add-edit-beneficios/add-edit-beneficios.component';
import { AddEditExperienciasComponent } from './experiencias/add-edit-experiencias/add-edit-experiencias.component';



@NgModule({
  declarations: [
    RutaExperienciaPageComponent,
    CiclosComponent,
    ExperienciasComponent,
    AddEditExperienciasComponent,
    BeneficiosComponent,
    ListBeneficiosComponent,
    AddEditBeneficiosComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RutaExperienciaPageComponent
  ]
})
export class RutaExperienciaModule { }
