import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxView360Module } from '@egjs/ngx-view360';

import { RutaExperienciaPageComponent } from './pages/ruta-experiencia-page/ruta-experiencia-page.component';
import { BeneficioFormComponent } from './components/beneficio-form/beneficio-form.component';
import { CicloIconsComponent } from './components/ciclo-icons/ciclo-icons.component';
import { ExperienciaFormComponent } from './components/experiencia-form/experiencia-form.component';
import { ExperienciaFormPaso1Component } from './components/experiencia-form/experiencia-form-paso1/experiencia-form-paso1.component';
import { ExperienciaFormPaso2Component } from './components/experiencia-form/experiencia-form-paso2/experiencia-form-paso2.component';
import { ExperienciasComponent } from './components/experiencias/experiencias.component';
import { ExperienciasNuevasComponent } from './components/experiencias-nuevas/experiencias-nuevas.component';
import { CardComponent } from './components/card/card.component';
import { BeneficiosComponent } from './components/beneficios/beneficios.component';
import { BeneficiosNuevoComponent } from './components/beneficios-nuevo/beneficios-nuevo.component';

@NgModule({
  declarations: [
    RutaExperienciaPageComponent,
    BeneficioFormComponent,
    CicloIconsComponent,
    ExperienciaFormComponent,
    ExperienciaFormPaso1Component,
    ExperienciaFormPaso2Component,
    ExperienciasComponent,
    ExperienciasNuevasComponent,
    CardComponent,
    BeneficiosComponent,
    BeneficiosNuevoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgxView360Module,
  ],
  exports: [RutaExperienciaPageComponent],
})
export class RutaExperienciaModule {}
