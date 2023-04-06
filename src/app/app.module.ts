import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RutaExperienciaModule } from './ruta-experiencia/ruta-experiencia.module';
import { FacultadesModule } from './facultades/facultades.module';
import { PreguntasFrecuentesModule } from './preguntas-frecuentes/preguntas-frecuentes.module';
import { CarrerasModule } from './carreras/carreras.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ErroresModule } from './errores/errores.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RutaExperienciaModule,
    FacultadesModule,
    CarrerasModule,
    UsuariosModule,
    PreguntasFrecuentesModule,
    ErroresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
