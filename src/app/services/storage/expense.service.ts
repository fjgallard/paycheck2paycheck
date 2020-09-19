import { Injectable } from '@angular/core';
import { EXPENSE_PREFIX } from '@helper/constants';

import { Storage }    from '@ionic/storage';

export interface Expense {
  id       : string;
  value    : number;
  createdAt: Date;
  category?: string;
};

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private storage: Storage) { }

  async getExpense(id: string) {
    const expenses = await this.storage.get(EXPENSE_PREFIX);
    return expenses[id];
  }

  async setExpense(expense: Expense) {
    let expenses = await this.storage.get(EXPENSE_PREFIX);
    if (!expenses) {
      expenses = {};
    }

    expenses[expense.id] = expense;
    return this.storage.set(EXPENSE_PREFIX, expenses);
  }

  deleteExpense() {}

  async getExpenses() {
    return await this.storage.get(EXPENSE_PREFIX);
  }
}
