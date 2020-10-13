import { Injectable } from '@angular/core';

import { Storage }    from '@ionic/storage';

import { DEFAULT_MONTHLY_BUDGET_ID, MONTHLY_BUDGET_PREFIX } from '@helper/constants';
import { convertToPrefixFormat, getCurrentMonthPrefix } from '@helper/functions';

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

}
