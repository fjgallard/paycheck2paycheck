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
    this.expenses$ = this.$expenses.asObservable().pipe(
      tap(expenses=> {
        console.log(expenses);
      })
    );
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
    console.log('deleted');
    return this.$expenses.next(expenses);
  }

  async getExpensesForTheDay(date: Date, budgetId?: string) {
    const allExpenses: Expense[] = await this.getExpensesFromStorage();
    const filteredExpenses = allExpenses.filter(expense =>{
      const day = expense.createdAt.getDate();
      const year = expense.createdAt.getFullYear();
      const month = expense.createdAt.getMonth();

      if (day === date.getDate() && year === date.getFullYear() && month === date.getMonth()) {
        return true;
      }
    });

    if (budgetId) {
      return filteredExpenses.filter(expense => expense.budgetId === budgetId);
    } else {
      return filteredExpenses;
    }
  }

  async getExpensesForTheMonth(date: Date, budgetId?: string) {
    const allExpenses: Expense[] = await this.getExpensesFromStorage();
    const filteredExpenses = allExpenses.filter(expense =>{
      const year = expense.createdAt.getFullYear();
      const month = expense.createdAt.getMonth();

      if (year === date.getFullYear() && month === date.getMonth()) {
        return true;
      } 
    })

    if (budgetId) {
      return filteredExpenses.filter(expense => expense.budgetId === budgetId);
    } else {
      return filteredExpenses;
    }
  }

  private async getExpensesFromStorage() {
    let expenses = await this.storage.get('expenses');
    if (!expenses) {
      expenses = [];
    }

    return expenses;
  }
}
