import { Injectable } from '@angular/core';

import { Storage }    from '@ionic/storage';

export interface Budget {
  id?: string,
  consumed?: number,
  limit?   : number,
  icon?    : string,
  duration? :string
};

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgets: Budget[] = [];

  private readonly BUDGET_STORAGE_ID = 'b';

  constructor(private storage: Storage) {
    this.reloadBudgets();
  }

  async setBudget(id: string, budget: Budget) {
    let budgets = await this.storage.get(this.BUDGET_STORAGE_ID);
    if (!budgets) {
      budgets = {};
    }

    budget.consumed = budget.consumed || 0;
    budget.limit = budget.limit || 0;

    budgets[id] = budget;
    await this.storage.set(this.BUDGET_STORAGE_ID, budgets);
    this.reloadBudgets();
  }

  getBudgets() {
    return this.storage.get(this.BUDGET_STORAGE_ID);
  }

  async getBudgetsArr() {
    return this.budgets;
  }

  getRemainingDays(budget: Budget) {
    if (!budget) {
      return;
    }

    if (budget.duration === 'monthly') {
      const currentDate = new Date();
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      return lastDay.getDate() - currentDate.getDate();
    } else if (budget.duration === 'annual') {
      const currentDate = new Date();
      const lastDay = new Date(currentDate.getFullYear(), 12, 0);

      return Math.floor((lastDay.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    } else if (budget.duration === 'weekly') {
      return 7 - (new Date().getDay());
    }
  }

  async reloadBudgets() {
    this.budgets = [];
    const budgetsObj = await this.getBudgets();
    if (budgetsObj) {
      const budgetKeys = Object.keys(budgetsObj);
      budgetKeys.forEach(key => {
        const budget = budgetsObj[key];
        this.budgets.push({ id: key, ...budget });
      });
    }

    return this.budgets;
  }

  async deleteBudget(id: string) {
    const budgets = await this.storage.get(this.BUDGET_STORAGE_ID);
    delete budgets[id];

    await this.storage.set(this.BUDGET_STORAGE_ID, budgets);
    return this.reloadBudgets();
  }

  getCssClass(budget: Budget) {
    const percentage = this.getPercentage(budget);
    if (percentage <= 0.5) {
      return 'success';
    } else if (percentage <= 0.8) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  private getPercentage(budget: Budget) {
    if (!budget.limit) {
      return 0;
    }

    return budget.consumed / budget.limit;
  }

}
