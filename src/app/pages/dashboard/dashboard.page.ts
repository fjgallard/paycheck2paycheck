import { Component, OnInit } from '@angular/core';

import { BudgetService } from '@services/storage/budget.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  monthlyBudget: number;

  constructor(
    private menu: MenuController,
    private budgetService: BudgetService
  ) { }

  async ngOnInit() {
    this.monthlyBudget = await this.getCurrentMonthBudget();

    if (!this.monthlyBudget) {
      this.monthlyBudget = await this.getDefaultMonthBudget();
      this.setCurrentMonthBudget(this.monthlyBudget);
    }
  }

  openMenu() {
    this.menu.open();
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
