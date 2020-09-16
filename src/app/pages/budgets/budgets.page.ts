import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BudgetService } from '@services/storage/budget.service';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  @ViewChild('budgetEditor') budgetEditor: IonInput;

  budget: number;
  customBudget: number;

  budgetEditorActive: boolean;

  constructor(private budgetService: BudgetService, private router: Router) {
    this.budgetEditorActive = false;
  }

  async ngOnInit() {
    this.budget = await this.budgetService.getCurrentMonthBudget();
    this.budget = this.budget || 0;
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
