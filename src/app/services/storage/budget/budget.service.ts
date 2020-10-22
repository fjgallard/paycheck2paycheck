import { Injectable } from '@angular/core';
import { Budget } from '@models/budget';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage }    from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private $budgets: BehaviorSubject<Budget[]>;
  private $monthlyBudgets: BehaviorSubject<Budget[]>;
  private $annualBudgets: BehaviorSubject<Budget[]>;
  private $weeklyBudgets: BehaviorSubject<Budget[]>;

  public budgets$: Observable<Budget[]>;
  public monthlyBudgets$: Observable<Budget[]>;
  public annualBudgets$: Observable<Budget[]>;
  public weeklyBudgets$: Observable<Budget[]>;

  constructor(private storage: Storage) {
    this.$budgets = new BehaviorSubject(null);
    this.budgets$ = this.$budgets.asObservable();

    this.$monthlyBudgets = new BehaviorSubject(null);
    this.monthlyBudgets$ = this.$monthlyBudgets.asObservable();

    this.$annualBudgets = new BehaviorSubject(null);
    this.annualBudgets$ = this.$annualBudgets.asObservable();

    this.$weeklyBudgets = new BehaviorSubject(null);
    this.weeklyBudgets$ = this.$weeklyBudgets.asObservable();

    this.reloadBudgets();
  }
  
  async createBudget(budget: Budget): Promise<void> {
    const budgets = await this.storage.get('budgets');

    budgets.push(budget);
    await this.storage.set('budgets', budgets);
    
    return this.reloadBudgets();
  }

  async getBudget(id: string): Promise<Budget> {
    const budgets: Budget[] = await this.storage.get('budgets');

    return budgets.filter(budget => budget.id === id)[0];
  }

  async updateBudget(id: string, budget: Budget) {
    const budgets = await this.storage.get('budgets');

    const index = budgets.findIndex(budget => budget.id === id);
    budgets[index] = budget;

    await this.storage.set('budgets', budgets);
    return this.reloadBudgets();
  }

  async deleteBudget(id: string) {
    const budgets: Budget[] = await this.storage.get('budgets');
    const index = budgets.findIndex(budget => budget.id === id);
    budgets.splice(index, 1);

    await this.storage.set('budgets', budgets);
    return this.reloadBudgets();
  }

  getCssClass(budget: Budget) {
    const percentage = this.getPercentage(budget);
    if (percentage <= 0.5) {
      return 'success';
    } else if (percentage <= 0.8) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  getRemainingDays(budget: Budget) {
    if (!budget) {
      return;
    }

    if (budget.duration === 'month') {
      const currentDate = new Date();
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      return lastDay.getDate() - currentDate.getDate();
    } else if (budget.duration === 'year') {
      const currentDate = new Date();
      const lastDay = new Date(currentDate.getFullYear(), 12, 0);

      return Math.floor((lastDay.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    } else if (budget.duration === 'week') {
      return 7 - (new Date().getDay());
    }
  }

  private getPercentage(budget: Budget) {
    return 0;
  }

  private async reloadBudgets() {
    let budgets: Budget[] = await this.storage.get('budgets');
    if (!budgets) {
      budgets = [];
      this.storage.set('budgets', budgets);
    }

    const monthlyArr = budgets.filter((budget: Budget) => budget.duration === 'month');
    const yearlyArr = budgets.filter((budget: Budget) => budget.duration === 'year');
    const weeklyArr = budgets.filter((budget: Budget) => budget.duration === 'week');

    this.$budgets.next(budgets);
    this.$monthlyBudgets.next(monthlyArr);
    this.$annualBudgets.next(yearlyArr);
    this.$weeklyBudgets.next(weeklyArr);
  }
}
