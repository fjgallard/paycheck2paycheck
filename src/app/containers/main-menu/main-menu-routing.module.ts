import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMenuPage } from './main-menu.page';
import { DashboardPage } from '@pages/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: MainMenuPage,
    children: [
      {
        path: '',
        loadChildren: () => import('@pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('@pages/settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'budgets',
        loadChildren: () => import('@pages/budgets/budgets.module').then( m => m.BudgetsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuPageRoutingModule {}
