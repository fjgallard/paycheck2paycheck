import { Injectable } from '@angular/core';

import { Storage }    from '@ionic/storage';

import { DEFAULT_MONTHLY_BUDGET_ID, MONTHLY_BUDGET_PREFIX } from '@helper/constants';
import { getCurrentMonthBudgetId, getCustomMonthBudgetId }       from '@helper/functions';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private currentMonthId: string;

  constructor(private storage: Storage) {
    this.currentMonthId = getCurrentMonthBudgetId();
  }

  // Monthly Budget functions
  getCurrentMonthBudget(): Promise<number> {
    return this.storage.get(this.currentMonthId);
  }

  setCurrentMonthBudget(amount: number) {
    return this.storage.set(this.currentMonthId, amount);
  }

  getCustomMonthBudget(mmyyyy: string) {
    return this.storage.get(getCustomMonthBudgetId(mmyyyy));
  }

  getDefaultMonthBudget(): Promise<number> {
    return this.storage.get(DEFAULT_MONTHLY_BUDGET_ID);
  }

  setDefaultMonthBudget(amount: number) {
    return this.storage.set(DEFAULT_MONTHLY_BUDGET_ID, amount);
  }
}
