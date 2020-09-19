import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {

  expenseIcon: string;

  constructor() {
    this.expenseIcon = 'wallet';
  }

  ngOnInit() {
  }

  get category() {
    return 'Uncategorized';
  }

}
