import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Budget } from '@models/budget';
import { Expense } from '@models/expense';
import { BudgetService } from '@services/storage/budget/budget.service';
import { ExpensesService } from '@services/storage/expenses/expenses.service';
import { Observable, Subscription } from 'rxjs';
import { combineAll, map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  budgets$: Observable<Budget[]>;
  expenses$: Observable<Expense[]>;

  private budgetsSubs: Subscription;

  budgets = [];

  constructor(
    private router         : Router,
    public budgetService   : BudgetService,
    private expensesService: ExpensesService
  ) {
    this.budgets$ = this.budgetService.budgets$;
    this.expenses$ = this.expensesService.expenses$;
  }

  async ngOnInit() {
    this.budgetsSubs = combineLatest([this.budgets$, this.expenses$]).subscribe(res => {
      const budgets = res[0];
      if (budgets) {
        this.getExpenses(budgets).then(newBudgets => {
          this.budgets = newBudgets;
        });
      }
    })
  }

  ngOnDestroy() {
    this.budgetsSubs.unsubscribe();
  }

  newExpense(budget: Budget) {
    this.router.navigate(['/expense/new'], { queryParams: { budget: JSON.stringify(budget) } });
  }

  navigateToExpenses(budget: Budget) {
    this.router.navigate([`expenses/${budget.id}`]);
  }

  getCssClass(budget: Budget) {
    return this.budgetService.getCssClass(budget);
  }

  getRemainingDays(budget: Budget) {
    return this.budgetService.getRemainingDays(budget);
  }

  getExpenses(budgets: Budget[]) {
    const x = budgets.map(async budget => {
      const consumed = await this.getConsumedAmount(budget);
      return {
        ...budget,
        consumed
      }
    });

    return Promise.all(x);
  }

  async getConsumedAmount(budget: Budget) {
    const expenses = await this.expensesService.getExpenses(budget);

    if (expenses && expenses.length > 0) {
      return expenses.map(expense => expense.value).reduce((a, b) =>  a + b);
    } else {
      return 0;
    }
  }

}
