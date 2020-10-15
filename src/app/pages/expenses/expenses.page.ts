import { Component, OnInit } from '@angular/core';
import { getCurrentMonthPrefix } from '@helper/functions';
import { Expense, ExpenseService } from '@services/storage/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  timePeriod = 'month';
  expenses: Expense[];

  constructor(private expensesService: ExpenseService) {
    this.expenses = [];
  }

  async ngOnInit() {
    const date = new Date();
    // const date = new Date(2020, 8, 24);
    this.setTimePeriod();

    console.log(await this.expensesService.getExpenses());
  }

  private async showDayExpenses() {
    this.expenses = await this.expensesService.getExpensesForTheDay(new Date());
    this.expenses = this.expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  private async showMonthExpenses() {
    this.expenses = await this.expensesService.getExpensesForTheMonth(new Date());
    this.expenses = this.expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  private async showWeekExpenses() {
    this.expenses = await this.expensesService.getExpensesForTheWeek(new Date());
    this.expenses = this.expenses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
