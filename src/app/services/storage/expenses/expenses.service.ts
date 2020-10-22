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

  constructor(private storage: Storage) {
    this.expenses$ = this.$expenses.asObservable();
  }

  async createExpense(expense: Expense) {
    const expenses: Expense[] = await this.storage.get('expenses');
    expenses.push(expense);

    await this.storage.set('expenses', expenses);
    return this.$expenses.next(expenses);
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
    await this.storage.set('expenses', expenses);
    return this.$expenses.next(expenses);
  }

  async deleteExpense(id: string) {
    const expenses: Expense[] = await this.storage.get('expenses');
    const index = expenses.findIndex(expense => expense.id === id);

    expenses.splice(index, 1);
    return this.$expenses.next(expenses);
  }
}
