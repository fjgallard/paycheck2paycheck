import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IntroGuard } from '@guards/intro.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'sidenav',
    loadChildren: () => import('./containers/main-menu/main-menu.module').then( m => m.MainMenuPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('@pages/settings/settings.module').then( m => m.SettingsPageModule),
  },
  {
    path: 'budgets',
    loadChildren: () => import('@pages/budgets/budgets.module').then( m => m.BudgetsPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'category/new',
    loadChildren: () => import('@pages/category/category.module').then( m => m.CategoryPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'category/:id',
    loadChildren: () => import('@pages/category/category.module').then( m => m.CategoryPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('@pages/categories/categories.module').then( m => m.CategoriesPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'expenses',
    loadChildren: () => import('@pages/expenses/expenses.module').then( m => m.ExpensesPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'expenses/:id',
    loadChildren: () => import('@pages/expenses/expenses.module').then( m => m.ExpensesPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'expense/new',
    loadChildren: () => import('@pages/expense/expense.module').then( m => m.ExpensePageModule),
    canActivate: [IntroGuard]
  },
  {
    path: 'expense/:id',
    loadChildren: () => import('@pages/expense/expense.module').then( m => m.ExpensePageModule),
    canActivate: [IntroGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
