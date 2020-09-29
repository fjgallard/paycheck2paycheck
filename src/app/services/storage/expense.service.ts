import { Injectable }            from '@angular/core';

import { EXPENSE_PREFIX }        from '@helper/constants';
import { convertToPrefixFormat } from '@helper/functions';

import { Storage }    from '@ionic/storage';
import { Category } from './category.service';

export interface Expense {
  id?      : string;
  value    : number;
  createdAt: Date;
  category?: Category;
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

    const id = `${EXPENSE_PREFIX}-${convertToPrefixFormat(date)}`;
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
    return await this.storage.get(EXPENSE_PREFIX);
  }

  async getExpensesForTheMonth(date: Date) {
    const expenses = await this.getExpenses();
    const prefix = convertToPrefixFormat(date);

    return expenses[prefix];
  }

  async getExpensesForTheDay(date: Date) {
    const allExpenses = await this.getExpenses();
    const prefix      = EXPENSE_PREFIX + '-' + convertToPrefixFormat(date);
    const day         = date.getDate();

    const expensesObj = allExpenses[prefix][day];

    if (expensesObj) {
      const keys = Object.keys(expensesObj);
      return keys.map(key => expensesObj[key] as Expense);
    } else {
      return [];
    }
  }
}
