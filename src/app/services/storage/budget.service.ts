import { Injectable } from '@angular/core';

import { Storage }    from '@ionic/storage';

import { DEFAULT_MONTHLY_BUDGET_ID, MONTHLY_BUDGET_PREFIX } from '@helper/constants';
import { getCurrentMonthId }         from '@helper/functions';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private storage: Storage) {
  }

  // Monthly Budget functions
  getCurrentMonthBudget(): Promise<number> {
    return this.storage.get(MONTHLY_BUDGET_PREFIX + '-' + getCurrentMonthId());
  }

  setCurrentMonthBudget(amount: number) {
    return this.storage.set(MONTHLY_BUDGET_PREFIX + '-' + getCurrentMonthId(), amount);
  }

  getCustomMonthBudget(mmyyyy: string) {
    return this.storage.get(`${MONTHLY_BUDGET_PREFIX}-${mmyyyy}`);
  }

  getDefaultMonthBudget(): Promise<number> {
    return this.storage.get(DEFAULT_MONTHLY_BUDGET_ID);
  }

  setDefaultMonthBudget(amount: number) {
    return this.storage.set(DEFAULT_MONTHLY_BUDGET_ID, amount);
  }
}
