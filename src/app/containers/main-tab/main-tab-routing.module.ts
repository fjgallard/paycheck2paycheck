import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainTabPage } from './main-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MainTabPage,
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
      },
      {
        path: 'category/:id',
        loadChildren: () => import('@pages/category/category.module').then( m => m.CategoryPageModule)
      },
      {
        path: 'category/new',
        loadChildren: () => import('@pages/category/category.module').then( m => m.CategoryPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainTabPageRoutingModule {}
