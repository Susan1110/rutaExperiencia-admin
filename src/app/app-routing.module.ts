import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
// import { MainPageComponent } from './main/main-page/main-page.component';

const routes: Routes = [
  { path: '', children: [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'main',
      // component: MainPageComponent
      loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
  ]},
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    // Configura la ruta base
    useHash: false, // Usa el hash en la URL (opcional, si es necesario)
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
