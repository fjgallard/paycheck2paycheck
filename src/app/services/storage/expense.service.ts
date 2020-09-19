import { Injectable } from '@angular/core';
import { EXPENSE_PREFIX } from '@helper/constants';
import { getCurrentMonthPrefix } from '@helper/functions';

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

  async setExpense(expense: Expense | Partial<Expense>) {
    const expensesId = EXPENSE_PREFIX + getCurrentMonthPrefix();
    let expenses = await this.storage.get(expensesId);
    if (!expenses) {
      expenses = {};
    }

    if(!expense.id) {
      expense.id = Object.keys(expenses).length.toString();
    }

    expenses[expense.id] = expense;
    return this.storage.set(EXPENSE_PREFIX, expenses);
  }

  deleteExpense() {}

  async getExpenses() {
    return await this.storage.get(EXPENSE_PREFIX + getCurrentMonthPrefix());
  }
}
