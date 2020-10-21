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

  async reloadBudgets() {
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

  async updateBudget(id: string, budget: Budget) {
    const budgets = await this.storage.get('budgets');

    const index = budgets.findIndex(budget => budget.id === id);
    budgets[index] = budget;

    await this.storage.set('budgets', budgets);
    return this.reloadBudgets();
  }

  async deleteBudget(id: string) {
    const budgets: Budget[] = await this.storage.get('budgets');
    console.log(budgets);
    const index = budgets.findIndex(budget => budget.id === id);
    budgets.splice(index, 1);

    await this.storage.set('budgets', budgets);
    return this.reloadBudgets();
  }
}
