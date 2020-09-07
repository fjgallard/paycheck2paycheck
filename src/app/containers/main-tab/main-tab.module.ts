import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainTabPageRoutingModule } from './main-tab-routing.module';

import { MainTabPage } from './main-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainTabPageRoutingModule
  ],
  declarations: [MainTabPage]
})
export class MainTabPageModule {}
