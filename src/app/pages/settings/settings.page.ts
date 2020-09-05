import { Component, OnInit } from '@angular/core';
import { BudgetService } from '@services/storage/budget.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  monthlyBudget: number;
  customBudget: number;

  constructor(private budgetService: BudgetService) { }

  async ngOnInit() {
    this.monthlyBudget = await this.getDefaultMonthBudget();
    this.customBudget = await this.getCurrentMonthBudget();
  }

  async updateCustomBudget() {
    if (this.customBudget) {
      this.setCurrentMonthBudget(this.customBudget);
    }
  }

  async updateMonthlyBudget() {
    if (this.monthlyBudget) {
      await this.budgetService.setDefaultMonthBudget(this.monthlyBudget);
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
