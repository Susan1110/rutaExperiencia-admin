import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RutaExperienciaPageComponent } from '../ruta-experiencia/pages/ruta-experiencia-page/ruta-experiencia-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'rutaExperiencia',
        component: RutaExperienciaPageComponent,
      },
      {
        path: '**',
        redirectTo: 'rutaExperiencia',
      },
      {
        path: '',
        redirectTo: '/admin/',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
