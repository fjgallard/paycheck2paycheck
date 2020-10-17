import { Injectable } from '@angular/core';
import { convertToPrefixFormat, getCurrentMonthPrefix, getCurrentYearPrefix } from '@helper/functions';

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
  monthlyBudgets: Budget[] = [];
  yearlyBudgets: Budget[] = [];

  private readonly BUDGET_STORAGE_ID = 'b';

  constructor(private storage: Storage) {
  }

  async getBudget(budget: Budget, date?: Date) {
    const budgets = await this.getBudgets();

    if (!date) {
      date = new Date();
    }

    if (budget.duration === 'monthly') {
      const prefix = convertToPrefixFormat(date);

      return budgets[`m-${prefix}`][budget.id];
    } else if (budget.duration === 'annual') {
      const prefix = 'y-' + new Date().getFullYear();
      
      return budgets[prefix][budget.id];
    }
  }

  async setBudget(id: string, budget: Budget, date?: Date) {
    if (!date) {
      date = new Date();
    }

    let budgets = await this.storage.get(this.BUDGET_STORAGE_ID);
    if (!budgets) {
      budgets = {};
    }

    if (budget.duration === 'monthly') {
      const prefix = convertToPrefixFormat(date);
      if (!budgets[`m-${prefix}`]) {
        budgets[`m-${prefix}`] = {};
      }

      budget.consumed = budget.consumed || 0;
      budget.limit = budget.limit || 0;

      budgets[`m-${prefix}`][id] = budget;
    } else if (budget.duration === 'weekly') {
      const currentDate = new Date();
      const remainingDays = 6 - currentDate.getDay();
      const pastDays = currentDate.getDay();

      const firstDayOfTheWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - pastDays);
      const lastDayOfTheWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + remainingDays);

      // discontinued
    } else if (budget.duration === 'annual') {
      const prefix = 'y-' + new Date().getFullYear();
      if (!budgets[prefix]) {
        budgets[prefix] = {};
      }

      budget.consumed = budget.consumed || 0;
      budget.limit = budget.limit || 0;

      budgets[prefix][id] = budget;
    }


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
    const budgetsObj = await this.getBudgets();

    this.budgets = [];
    this.yearlyBudgets = [];
    this.monthlyBudgets = [];

    if (budgetsObj) {
      const budgetKeys = Object.keys(budgetsObj);
      budgetKeys.forEach(key => {

        if (key === `m-${getCurrentMonthPrefix()}`) {
          const monthlyBudgets = budgetsObj[key];
          const monthlyBudgetKeys = Object.keys(monthlyBudgets);

          monthlyBudgetKeys.forEach(monthlyKey => {
            const budget = monthlyBudgets[monthlyKey];
            this.budgets.push({ id: monthlyKey, ...budget });
            this.monthlyBudgets.push({ id: monthlyKey, ...budget });
          });
        } else if (key === `y-${getCurrentYearPrefix()}`) {
          const yearlyBudgets = budgetsObj[key];
          const yearlyBudgetKeys = Object.keys(yearlyBudgets);

          yearlyBudgetKeys.forEach(yearlyKey => {
            const budget = yearlyBudgets[yearlyKey];
            this.budgets.push({ id: yearlyKey, ...budget });
            this.yearlyBudgets.push({ id: yearlyKey, ...budget });
          });
        }
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
