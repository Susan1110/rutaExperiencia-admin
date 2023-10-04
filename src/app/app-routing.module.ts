import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/guards/auth.guard';
import { loginGuard } from './auth/guards/login.guard';
// import { MainPageComponent } from './main/main-page/main-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'main',
    // component: MainPageComponent
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Configura la ruta base
    useHash: true, // Usa el hash en la URL (opcional, si es necesario)
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
