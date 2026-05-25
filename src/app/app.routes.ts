import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./pages/inventario/inventario.component').then(m => m.InventarioComponent),
    canActivate: [authGuard]
  },
  {
    path: 'movimiento',
    loadComponent: () =>
      import('./pages/movimiento/movimiento.component').then(m => m.MovimientoComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];