import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaExperienciaPageComponent } from '../ruta-experiencia/ruta-experiencia-page/ruta-experiencia-page.component';
import { FacultadesPageComponent } from '../facultades/facultades-page/facultades-page.component';
import { CarrerasPageComponent } from '../carreras/carreras-page/carreras-page.component';
import { UsuariosPageComponent } from '../usuarios/usuarios-page/usuarios-page.component';
import { PreguntasFrecuentesPageComponent } from '../preguntas-frecuentes/preguntas-frecuentes-page/preguntas-frecuentes-page.component';
import { ErroresPageComponent } from '../errores/errores-page/errores-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'rutaExperiencia',
        component: RutaExperienciaPageComponent
      },
      {
        path: 'facultades',
        component: FacultadesPageComponent
      },
      {
        path: 'carreras',
        component: CarrerasPageComponent
      },
      {
        path: 'usuarios',
        component: UsuariosPageComponent
      },
      {
        path: 'preguntasFrecuentes',
        component: PreguntasFrecuentesPageComponent
      },
      {
        path: 'errores',
        component: ErroresPageComponent
      },
      {
        path: '**',
        redirectTo: 'rutaExperiencia'
      },
      {
        path: '',
        redirectTo: '/admin/rutaExperiencia',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
