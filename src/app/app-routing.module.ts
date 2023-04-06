import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { RutaExperienciaPageComponent } from './ruta-experiencia/ruta-experiencia-page/ruta-experiencia-page.component'
import { FacultadesPageComponent } from './facultades/facultades-page/facultades-page.component'
import { CarrerasPageComponent } from './carreras/carreras-page/carreras-page.component'
import { UsuariosPageComponent } from './usuarios/usuarios-page/usuarios-page.component'
import { PreguntasFrecuentesPageComponent } from './preguntas-frecuentes/preguntas-frecuentes-page/preguntas-frecuentes-page.component'
import { ErroresPageComponent } from './errores/errores-page/errores-page.component'

const routes: Routes = [
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
        component: CarrerasPageComponent,
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
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }