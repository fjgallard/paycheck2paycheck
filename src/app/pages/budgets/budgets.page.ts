import { Component, OnInit } from '@angular/core';
import { BudgetService } from '@services/storage/budget.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  budget: number;
  customBudget: number;

  constructor(private budgetService: BudgetService) {
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

}
