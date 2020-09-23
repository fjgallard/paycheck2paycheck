import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensePageRoutingModule } from './expense-routing.module';

import { ExpensePage } from './expense.page';
import { ExpenseCategoriesComponent } from './expense-categories/expense-categories.component';

const components = [
  ExpenseCategoriesComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExpensePageRoutingModule
  ],
  declarations: [ExpensePage,
    ...components]
})
export class ExpensePageModule {}
