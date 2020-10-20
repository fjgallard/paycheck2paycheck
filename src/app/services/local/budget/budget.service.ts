import { Injectable } from '@angular/core';
import { Budget } from '@models/budget';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private $budgets: BehaviorSubject<Budget[]>;
  public budgets$: Observable<Budget[]>;

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
    this.$budgets.next(budgetsArr);
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
