import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Budget } from '@models/budget';
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
    this.router.navigate(['/expense/new'], { queryParams: { data: JSON.stringify(budget) } });
  }

  getRemainingDays() {
    return 30;
  }

}
