import { Component, OnInit } from '@angular/core';
import { BudgetService } from '@services/storage/budget.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  budget: number;

  constructor(private budgetService: BudgetService) {
    this.budgetService.getCurrentMonthBudget().then(budget => {
      this.budget = budget;
    });
  }

  ngOnInit() {
  }

}
