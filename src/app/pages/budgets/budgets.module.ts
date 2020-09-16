import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetsPageRoutingModule } from './budgets-routing.module';

import { BudgetsPage } from './budgets.page';
import { ComponentsModule } from '@components/components.module';
import { BudgetCategoryComponent } from './budget-category/budget-category.component';

const components = [
  BudgetCategoryComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetsPageRoutingModule,

    ComponentsModule,
  ],
  declarations: [BudgetsPage, ...components]
})
export class BudgetsPageModule {}
