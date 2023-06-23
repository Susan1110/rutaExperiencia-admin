import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaExperienciaPageComponent } from './pages/ruta-experiencia-page/ruta-experiencia-page.component';
import { BeneficioFormComponent } from './components/beneficio-form/beneficio-form.component';
import { BeneficioListComponent } from './components/beneficio-list/beneficio-list.component';
import { CicloIconsComponent } from './components/ciclo-icons/ciclo-icons.component';
import { ExperienciaFormComponent } from './components/experiencia-form/experiencia-form.component';
import { ExperienciaListComponent } from './components/experiencia-list/experiencia-list.component';
import { ExperienciaCardComponent } from './components/experiencia-list/experiencia-card/experiencia-card.component';
import { ExperienciaFormPaso1Component } from './components/experiencia-form/experiencia-form-paso1/experiencia-form-paso1.component';
import { ExperienciaFormPaso2Component } from './components/experiencia-form/experiencia-form-paso2/experiencia-form-paso2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxView360Module } from '@egjs/ngx-view360';

@NgModule({
  declarations: [
    RutaExperienciaPageComponent,
    BeneficioFormComponent,
    BeneficioListComponent,
    CicloIconsComponent,
    ExperienciaFormComponent,
    ExperienciaFormPaso1Component,
    ExperienciaFormPaso2Component,
    ExperienciaListComponent,
    ExperienciaCardComponent,
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
