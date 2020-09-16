import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BudgetService } from '@services/storage/budget.service';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { Category, CategoryService } from '@services/storage/category.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  @ViewChild('budgetEditor') budgetEditor: IonInput;

  budget: number;
  categories: Category[] = [];
  customBudget: number;

  budgetEditorActive: boolean;

  constructor(
    private budgetService    : BudgetService,
    private categoriesService: CategoryService,
    private router           : Router
  ) {
    this.budgetEditorActive = false;
  }

  async ngOnInit() {
    this.budget = await this.budgetService.getCurrentMonthBudget();
    this.budget = this.budget || 0;

    const categoriesObj = await this.categoriesService.getCategories();
    const keys = Object.keys(categoriesObj);
    keys.forEach(key => {
      this.categories.push(categoriesObj[key])
    });
  }

  async updateCustomBudget() {
    if (this.customBudget) {
      this.budgetService.setCurrentMonthBudget(this.customBudget);
    }
  }

  async updateMonthlyBudget() {
    if (this.budget) {
      await this.budgetService.setDefaultMonthBudget(this.budget);
    }
  }

  addCategory() {
    this.router.navigateByUrl('category/new');
  }

  openBudgetEditor() {
    this.budgetEditorActive = true;
    this.budgetEditor.setFocus();
  }

  closeBudgetEditor() {
    if (this.budgetEditorActive) {
      this.budgetEditorActive = false;
      this.budgetService.setCurrentMonthBudget(this.budget);
    }
  }

  toggleBudgetEditor() {
    this.budgetEditorActive = !this.budgetEditorActive;
    this.budgetEditor.setFocus();
  }



}
