import { Injectable } from '@angular/core';
import { Budget } from '@models/budget';
import { BehaviorSubject, Observable } from 'rxjs';

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
  public weeklyyBudgets$: Observable<Budget[]>;

  constructor(private storage: Storage) {
    this.$budgets = new BehaviorSubject(null);
    this.budgets$ = this.$budgets.asObservable();

    this.reloadBudgets();
  }
  
  async createBudget(budget: Budget): Promise<void> {
    const budgetsStr = await this.storage.get('budgets');
    const budgetsObj = convertStringToObject(budgetsStr);
    const budgetsArr = convertObjectToArray(budgetsObj);

    budgetsArr.push(budget);
    const newBudgetsObj = convertArrayToObject(budgetsArr);
    
    this.storage.setItem('budgets', JSON.stringify(newBudgetsObj));
    return this.reloadBudgets();
  }

  async getBudget(id: string): Promise<Budget> {
    const budgetsStr = await this.storage.get('budgets');
    const budgetsObj = convertStringToObject(budgetsStr);
    const budgetsArr = convertObjectToArray(budgetsObj);

    return budgetsArr.filter(budget => budget.id === id)[0];
  }

  async reloadBudgets() {
    const budgets: string = await this.storage.get('budgets');
    const budgetsArr = convertObjectToArray(JSON.parse(budgets));
    const monthlyArr = budgetsArr.filter((budget: Budget) => budget.duration === 'month');
    const yearlyArr = budgetsArr.filter((budget: Budget) => budget.duration === 'year');
    const weeklyArr = budgetsArr.filter((budget: Budget) => budget.duration === 'week');

    this.$budgets.next(budgetsArr);
    this.$monthlyBudgets.next(monthlyArr);
    this.$annualBudgets.next(yearlyArr);
    this.$weeklyBudgets.next(weeklyArr);
  }

  async updateBudget(id: string, budget: Budget) {
    const budgetsStr = await this.storage.get('budgets');
    const budgetsObj = convertStringToObject(budgetsStr);
    const budgetsArr = convertObjectToArray(budgetsObj);

    const index = budgetsArr.findIndex(budget => budget.id === id);
    budgetsArr[index] = budget;

    const newBudgetsObj = convertArrayToObject(budgetsArr);
    this.storage.setItem('budgets', JSON.stringify(newBudgetsObj));
    return this.reloadBudgets();
  }

  async deleteBudget(id: string) {
    const budgetsStr = await this.storage.get('budgets');
    const budgetsObj = convertStringToObject(budgetsStr);
    const budgetsArr = convertObjectToArray(budgetsObj);

    const index = budgetsArr.findIndex(budget => budget.id === id);
    budgetsArr.splice(index, 1);

    const newBudgetsObj = convertArrayToObject(budgetsArr);
    this.storage.setItem('budgets', JSON.stringify(newBudgetsObj));
    return this.reloadBudgets();
  }
}
