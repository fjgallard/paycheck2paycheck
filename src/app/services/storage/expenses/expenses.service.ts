import { Injectable } from '@angular/core';
import { Storage }    from '@ionic/storage';
import { Expense }    from '@models/expense';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  expenses$: Observable<Expense[]>;

  private $expenses: BehaviorSubject<Expense[]>;

  constructor(private storage: Storage) { }

  async createExpense(expense: Expense) {
    const expenses: Expense[] = await this.storage.get('expenses');
    expenses.push(expense);

    return this.storage.set('expenses', expenses);

  }

  async getExpense(id: string) {
    const expenses: Expense[] = await this.storage.get('expenses');
    const expense = expenses.filter(exp => exp.id === id);

    return expense[0];
  }

  async updateExpense(id: string, expense: Expense) {
    const expenses: Expense[] = await this.storage.get('expenses');
    const index = expenses.findIndex(expense => expense.id === id);

    expenses[index] = expense;
    return this.storage.set('expenses', expenses);
  }

  async deleteExpense(id: string) {
    const expenses: Expense[] = await this.storage.get('expenses');
    const index = expenses.findIndex(expense => expense.id === id);

    expenses.splice(index, 1);
    return expenses;
  }
}
