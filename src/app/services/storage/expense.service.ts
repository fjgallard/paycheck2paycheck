import { Injectable }            from '@angular/core';

import { EXPENSE_PREFIX }        from '@helper/constants';
import { convertToPrefixFormat, getCurrentMonthPrefix, getCurrentYearPrefix } from '@helper/functions';

import { Storage }    from '@ionic/storage';
import { Budget, BudgetService } from './budget.service';

export interface Expense {
  id?      : string;
  value    : number;
  createdAt: Date;
  budgetId?: string;
};

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private storage: Storage, private budgetService: BudgetService) {
  }

  async getExpense(id: string) {
    const expenses = await this.storage.get(EXPENSE_PREFIX);
    return expenses[id];
  }

  async setExpense(expense: Expense | Partial<Expense>, date: Date, budget: Budget) {
    const expensesId = EXPENSE_PREFIX;

    const day = date.getDate();

    let expenses = await this.storage.get(expensesId);

    if (!expenses) {
      expenses = {};
    }

    if (budget.duration === 'monthly') {
      const prefix = `m-${getCurrentMonthPrefix()}`
      if (!expenses[prefix]) {
        expenses[prefix] = {};
      }

      if (!expenses[prefix][budget.id]) {
        expenses[prefix][budget.id] = {};
      }

      expenses[prefix][budget.id][expense.id] = expense;

      this.deductFromBudget(convertToPrefixFormat(date), expense.value, budget);
    } else if (budget.duration === 'annual') {
      const prefix = `m-${getCurrentYearPrefix()}`;
      if (!expenses[prefix]) {
        expenses[prefix] = {};
      }

      if (!expenses[prefix][budget.id]) {
        expenses[prefix][budget.id] = {};
      }

      expenses[prefix][budget.id][expense.id] = expense;

      this.deductFromBudget(getCurrentYearPrefix().toString(), expense.value, budget);
    }

    return this.storage.set(EXPENSE_PREFIX, expenses);
  }

  deleteExpense() {}

  async getExpenses() {
    return await this.storage.get(EXPENSE_PREFIX);
  }

  async getExpensesForTheMonth(date: Date): Promise<Expense[]> {
    const allExpenses = await this.getExpenses();

    if (!allExpenses) {
      return [];
    }

    const prefix   = 'm' + '-' + convertToPrefixFormat(date);
    const expensesObj = allExpenses[prefix];

    if (expensesObj) {
      const monthExpenses: Expense[] = [];
      const keys = Object.keys(expensesObj);
      keys.forEach(key => {
        const dayExpenses     = expensesObj[key];
        const dayExpensesKeys = Object.keys(dayExpenses);

        return dayExpensesKeys.forEach(dayKey => monthExpenses.push(dayExpenses[dayKey] as Expense));
      });

      return monthExpenses;
    } else {
      return [];
    }
  }

  async getExpensesForTheWeek(date: Date) {
    const allExpenses = await this.getExpenses();
    let weekExpenses: Expense[] = [];

    const todayExpenses = await this.getExpensesForTheDay(date);
    weekExpenses = weekExpenses.concat(todayExpenses);
    for(let count = 6; count > 0; count--) {
      const previousDate = date.getDate() - 1;
      const dayExpenses = await this.getExpensesForTheDay(new Date(date.setDate(previousDate)));

      weekExpenses = weekExpenses.concat(dayExpenses);
    }

    return weekExpenses;
  }

  async getExpensesForTheDay(date: Date) {
    const allExpenses = await this.getExpenses();

    if (!allExpenses) {
      return [];
    }

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

  private async deductFromBudget(prefix: string, expenseVal: number, budget: Budget) {
    budget.consumed += expenseVal;
    this.budgetService.setBudget(budget.id, budget);
  }
}
