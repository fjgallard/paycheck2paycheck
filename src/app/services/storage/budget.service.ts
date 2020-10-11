import { Injectable } from '@angular/core';

import { Storage }    from '@ionic/storage';

import { DEFAULT_MONTHLY_BUDGET_ID, MONTHLY_BUDGET_PREFIX } from '@helper/constants';
import { convertToPrefixFormat, getCurrentMonthPrefix } from '@helper/functions';

export interface Budget {
  name     : string,
  consumed?: number,
  limit?   : number,
  icon?    : string,
};

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private readonly BUDGET_STORAGE_ID = 'b';

  private currentMonthId: string;

  constructor(private storage: Storage) {
    this.currentMonthId = this.getCurrentMonthBudgetId();
  }

  async setBudget(id:string, budget: Budget) {
    let budgets = await this.storage.get(this.BUDGET_STORAGE_ID);
    if (!budgets) {
      budgets = {};
    }

    budgets[id] = budget;
    return this.storage.set(this.BUDGET_STORAGE_ID, budgets);
  }


  // Archive
  // Monthly Budget functions
  getCurrentMonthBudget(): Promise<number> {
    return this.storage.get(this.currentMonthId);
  }

  setCurrentMonthBudget(amount: number) {
    return this.storage.set(this.currentMonthId, amount);
  }

  getCustomMonthBudget(date: Date) {
    return this.storage.get(this.getCustomMonthBudgetId(date));
  }

  getDefaultMonthBudget(): Promise<number> {
    return this.storage.get(DEFAULT_MONTHLY_BUDGET_ID);
  }

  setDefaultMonthBudget(amount: number) {
    return this.storage.set(DEFAULT_MONTHLY_BUDGET_ID, amount);
  }

  private getCurrentMonthBudgetId() {
    return MONTHLY_BUDGET_PREFIX + '-' + getCurrentMonthPrefix()
  }

  private getCustomMonthBudgetId(date: Date) {
    return `${MONTHLY_BUDGET_PREFIX}-${convertToPrefixFormat(date)}`;
  }
}
