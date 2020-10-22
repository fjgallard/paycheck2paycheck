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
    this.$expenses = new BehaviorSubject(null);
    this.expenses$ = this.$expenses.asObservable();
  }

  async createExpense(expense: Expense) {
    const expenses: Expense[] = await this.getExpensesFromStorage();
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
    const expenses: Expense[] = await this.getExpensesFromStorage();
    const index = expenses.findIndex(expense => expense.id === id);

    expenses.splice(index, 1);
    return this.$expenses.next(expenses);
  }

  async getExpensesForTheDay(date: Date) {
    const allExpenses: Expense[] = await this.getExpensesFromStorage();
    return allExpenses.filter(expense =>{
      const day = expense.createdAt.getDate();
      const year = expense.createdAt.getFullYear();
      const month = expense.createdAt.getMonth();

      if (day === date.getDate() && year === date.getFullYear() && month === date.getMonth()) {
        return true;
      } 
    })
  }

  async getExpensesForTheMonth(date: Date) {
    const allExpenses: Expense[] = await this.getExpensesFromStorage();
    return allExpenses.filter(expense =>{
      const year = expense.createdAt.getFullYear();
      const month = expense.createdAt.getMonth();

      if (year === date.getFullYear() && month === date.getMonth()) {
        return true;
      } 
    })
  }

  private async getExpensesFromStorage() {
    let expenses = await this.storage.get('expenses');
    if (!expenses) {
      expenses = [];
    }

    return expenses;
  }
}
