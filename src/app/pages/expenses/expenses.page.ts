import { Component, OnInit } from '@angular/core';
import { getCurrentMonthPrefix } from '@helper/functions';
import { Expense, ExpenseService } from '@services/storage/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  expenses: Expense[];

  constructor(private expensesService: ExpenseService) {
    this.expenses = [];
  }

  async ngOnInit() {
    const date = new Date();
    // const date = new Date(2020, 8, 24);
    this.expenses = await this.expensesService.getExpensesForTheDay(date);
    this.expenses = this.expenses.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

}
