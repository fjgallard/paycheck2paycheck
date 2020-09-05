import { Component, OnInit } from '@angular/core';

import { BudgetService } from '@services/storage/budget.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  monthlyBudget: number;

  constructor(private budgetService: BudgetService) { }

  async ngOnInit() {
    this.monthlyBudget = await this.getCurrentMonthBudget();

    if (!this.monthlyBudget) {
      this.monthlyBudget = await this.getDefaultMonthBudget();
      this.setCurrentMonthBudget(this.monthlyBudget);
    }
  }

  private getCurrentMonthBudget() {
    return this.budgetService.getCurrentMonthBudget();
  }

  private getDefaultMonthBudget() {
    return this.budgetService.getDefaultMonthBudget();
  }

  private setCurrentMonthBudget(budget: number) {
    return this.budgetService.setCurrentMonthBudget(budget);
  }

}
