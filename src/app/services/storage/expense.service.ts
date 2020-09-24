import { Injectable } from '@angular/core';
import { EXPENSE_PREFIX } from '@helper/constants';
import { getCurrentMonthPrefix } from '@helper/functions';

import { Storage }    from '@ionic/storage';

export interface Expense {
  id?      : string;
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

  async setExpense(expense: Expense | Partial<Expense>, date: Date) {
    const expensesId = EXPENSE_PREFIX;

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const id = `e-${month.toString()}-${year.toString()}`;
    const day = date.getDate();

    let expenses = await this.storage.get(expensesId);
    if (!expenses) {
      expenses = {};
    }

    if (!expenses[id]) {
      expenses[id] = {};
    }

    if (!expenses[id][day]) {
      expenses[id][day] = {};
    }

    if(!expense.id) {
      expense.id = Object.keys(expenses[id][day]).length.toString();
    }

    expenses[id][day][expense.id] = expense;
    return this.storage.set(EXPENSE_PREFIX, expenses);
  }

  deleteExpense() {}

  async getExpenses() {
    return await this.storage.get(EXPENSE_PREFIX + getCurrentMonthPrefix());
  }
}
