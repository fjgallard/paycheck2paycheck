import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Budget } from '@models/budget';
import { Expense } from '@models/expense';
import { BudgetService } from '@services/storage/budget/budget.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  budgets$: Observable<Budget[]>;

  constructor(
    private router      : Router,
    public budgetService: BudgetService
  ) {
    this.budgets$ = this.budgetService.budgets$;
  }

  async ngOnInit() {
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

}
