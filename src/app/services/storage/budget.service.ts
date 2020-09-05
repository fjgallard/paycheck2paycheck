import { Injectable } from '@angular/core';

import { Storage }    from '@ionic/storage';

import { DEFAULY_MONTHLY_BUDGET_ID } from '@helper/constants';
import { getCurrentMonthId }         from '@helper/functions';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private storage: Storage) {
  }

  // Monthly Budget functions
  getCurrentMonthBudget(): Promise<number> {
    return this.storage.get(getCurrentMonthId());
  }

  setCurrentMonthBudget(amount: number) {
    return this.storage.set(getCurrentMonthId(), amount);
  }

  getCustomMonthBudget(mmyyyy: string) {
    return this.storage.get(`i-${mmyyyy}`);
  }

  getDefaultMonthBudget(): Promise<number> {
    return this.storage.get(DEFAULY_MONTHLY_BUDGET_ID);
  }

  setDefaultMonthBudget(amount: number) {
    return this.storage.set(DEFAULY_MONTHLY_BUDGET_ID, amount);
  }
}
