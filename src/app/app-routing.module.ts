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
    loadChildren: () => import('./containers/main-menu/main-menu.module').then( m => m.MainMenuPageModule),
    canActivate: [IntroGuard]
  },
  {
    path: '',
    loadChildren: () => import('./containers/main-tab/main-tab.module').then( m => m.MainTabPageModule),
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
