import { Component, OnInit }       from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from '@models/budget';
import { Expense } from '@models/expense';
import { BudgetService } from '@services/storage/budget/budget.service';
import { ExpensesService } from '@services/storage/expenses/expenses.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  timePeriod = 'today';
  budget: Budget;
  expenses$: Observable<Expense[]>;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private budgetService: BudgetService,
    private expensesService: ExpensesService) {
    this.expenses$ = this.expensesService.expenses$.pipe(
      tap(expense => console.log(expense))
    );

    const id = this.route.snapshot.paramMap.get('id');
    this.budgetService.getBudget(id).then(budget => {
      this.budget = budget;
      this.setTimePeriod();
    });
  }

  async ngOnInit() {
  }

  navigateToExpense(expense: Expense) {
    this.router.navigate([`expense/${expense.id}`]);
  }


  async deleteExpense(expense: Expense) {
    await this.expensesService.deleteExpense(expense.id);
  }

  private async showDayExpenses() {
    this.expenses$ = this.expensesService.expenses$.pipe(
      map(expenses => this.getExpensesForTheDay(expenses, new Date(), this.budget.id))
    );
  }

  private async showMonthExpenses() {
    this.expenses$ = this.expensesService.expenses$.pipe(
      map(expenses => this.getExpensesForTheMonth(expenses, new Date(), this.budget.id))
    );
  }

  private getExpensesForTheDay(allExpenses: Expense[], date: Date, budgetId?: string) {
    if (!allExpenses) {
      return [];
    }
    const filteredExpenses = allExpenses.filter(expense =>{
      const day = expense.createdAt.getDate();
      const year = expense.createdAt.getFullYear();
      const month = expense.createdAt.getMonth();

      if (day === date.getDate() && year === date.getFullYear() && month === date.getMonth()) {
        return true;
      }
    });

    if (budgetId) {
      return filteredExpenses
        .filter(expense => expense.budgetId === budgetId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      return filteredExpenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  private getExpensesForTheMonth(allExpenses: Expense[], date: Date, budgetId?: string) {
    if (!allExpenses) {
      return [];
    }

    const filteredExpenses = allExpenses.filter(expense =>{
      const year = expense.createdAt.getFullYear();
      const month = expense.createdAt.getMonth();

      if (year === date.getFullYear() && month === date.getMonth()) {
        return true;
      } 
    })

    if (budgetId) {
      return filteredExpenses
        .filter(expense => expense.budgetId === budgetId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      return filteredExpenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }

  setTimePeriod() {
    if (this.timePeriod === 'today') {
      this.showDayExpenses();
    } else if (this.timePeriod === 'month') {
      this.showMonthExpenses();
    } else if (this.timePeriod === 'week') {
      // this.showWeekExpenses();
    }
  }

}
