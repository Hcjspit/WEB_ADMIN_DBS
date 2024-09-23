import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// project import
import { AdminComponent } from './demo/layout/admin';
import { EmptyComponent } from './demo/layout/empty';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/pages/dashboard/dashboard.component'),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'component',
        loadChildren: () => import('./demo/pages/ui-component/ui-component.module').then((m) => m.UiComponentModule)
      },
      {
        path: 'table/factory-summary',
        loadComponent: () => import('./demo/pages/table/table.component').then((m) => m.TableComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'table/worked-pieces',
        loadComponent: () =>
          import('./demo/pages/worked-pieces-table/worked-pieces-table.component').then((m) => m.WorkedPiecesTableComponent),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: EmptyComponent,
    children: [
      {
        path: 'auth/login',
        loadComponent: () => import('../app/demo/pages/auth/login/login.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
