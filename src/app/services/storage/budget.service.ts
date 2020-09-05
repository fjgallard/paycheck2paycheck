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

  getCurrentMonthBudget(): Promise<number> {
    return this.storage.get(getCurrentMonthId());
  }

  setCurrentMonthIncome(amount: number) {
    return this.storage.set(getCurrentMonthId(), amount);
  }

  getCustomMonthIncome(mmyyyy: string) {
    return this.storage.get(`i-${mmyyyy}`);
  }

  getDefaultMonthIncome(): Promise<number> {
    return this.storage.get(DEFAULY_MONTHLY_BUDGET_ID);
  }

  setDefaultMonthIncome(amount: number) {
    return this.storage.set(DEFAULY_MONTHLY_BUDGET_ID, amount);
  }
}
