import { Injectable } from '@angular/core';
import { Storage }    from '@ionic/storage';
import { Expense }    from '@models/expense';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  expenses$: Observable<Expense[]>;

  private $expenses: BehaviorSubject<Expense[]>;

  constructor(private storage: Storage) {
    this.$expenses = new BehaviorSubject(null);
    this.expenses$ = this.$expenses.asObservable();

    this.getExpensesFromStorage().then(expenses => {
      this.$expenses.next(expenses);
    })
  }

  async createExpense(expense: Expense) {
    const expenses: Expense[] = await this.getExpensesFromStorage();
    if (!expense.id) {
      expense.id = expenses.length.toString();
    }
    expenses.push(expense);

    await this.storage.set('expenses', expenses);
    return this.$expenses.next(expenses);
  }

  async getExpense(id: string) {
    const expenses: Expense[] = await this.getExpensesFromStorage();
    const expense = expenses.filter(exp => exp.id === id);

    return expense[0];
  }

  async updateExpense(id: string, expense: Expense) {
    const expenses: Expense[] = await this.getExpensesFromStorage();
    const index = expenses.findIndex(expense => expense.id === id);

    expenses[index] = expense;
    await this.storage.set('expenses', expenses);
    return this.$expenses.next(expenses);
  }

  async deleteExpense(id: string) {
    let expenses: Expense[] = await this.getExpensesFromStorage();
    const index = expenses.findIndex(expense => expense.id === id);
    expenses = expenses.map(expense => {
      let idNum = Number(expense.id);
      if (idNum > Number(id)) {
        idNum--;
        expense.id = idNum.toString();
      }

      return expense;
    })

    expenses.splice(index, 1);
    await this.storage.set('expenses', expenses);
    return this.$expenses.next(expenses);
  }

  private async getExpensesFromStorage() {
    let expenses = await this.storage.get('expenses');
    if (!expenses) {
      expenses = [];
    }

    return expenses;
  }
}
