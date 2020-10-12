import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BudgetsPageRoutingModule } from './budgets-routing.module';

import { BudgetsPage } from './budgets.page';
import { ComponentsModule } from '@components/components.module';
import { BudgetCategoryComponent } from './budget-category/budget-category.component';
import { BudgetComponent } from './budget/budget.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

const components = [
  BudgetCategoryComponent,
  BudgetComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BudgetsPageRoutingModule,

    ComponentsModule,

    DragDropModule
  ],
  declarations: [BudgetsPage, ...components]
})
export class BudgetsPageModule {}
