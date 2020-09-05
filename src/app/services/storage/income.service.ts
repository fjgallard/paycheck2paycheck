import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private readonly DEFAULY_MONTHLY_INCOME_ID = 'mi';

  constructor(private storage: Storage) {
  }

  getCurrentMonthIncome(): Promise<number> {
    return this.storage.get(this.getCurrentMonthId());
  }

  setCurrentMonthIncome(amount: number) {
    return this.storage.set(this.getCurrentMonthId(), amount);
  }

  getCustomMonthIncome(mmyyyy: string) {
    return this.storage.get(`i-${mmyyyy}`);
  }

  getDefaultMonthIncome(): Promise<number> {
    return this.storage.get(this.DEFAULY_MONTHLY_INCOME_ID);
  }

  setDefaultMonthIncome(amount: number) {
    return this.storage.set(this.DEFAULY_MONTHLY_INCOME_ID, amount);
  }

  getCurrentMonthId() {
    const date = new Date();
    const incomeForTheMonth = 'i-' + (date.getMonth() + 1)  + '-' + date.getFullYear();

    return incomeForTheMonth;
  }
}
