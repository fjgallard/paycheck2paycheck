import { Component, OnInit }       from '@angular/core';
import { Expense } from '@models/expense';
import { ExpensesService } from '@services/storage/expenses/expenses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  timePeriod = 'month';
  expenses: Expense[];

  expenses$: Observable<Expense[]>;

  constructor(private expensesService: ExpensesService) {
    this.expenses = [];
    this.expenses$ = this.expensesService.expenses$;
  }

  async ngOnInit() {
    const date = new Date();
    // const date = new Date(2020, 8, 24);
    this.setTimePeriod();
  }

  private async showDayExpenses() {
    this.expenses = await this.expensesService.getExpensesForTheDay(new Date());
    this.expenses = this.expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  private async showMonthExpenses() {
    this.expenses = await this.expensesService.getExpensesForTheMonth(new Date());
    this.expenses = this.expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
