import { Component, OnInit } from '@angular/core';

import { Budget, BudgetService } from '@services/storage/budget.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  constructor(
    private router: Router,
    public budgetService: BudgetService
  ) {
  }

  async ngOnInit() {
  }

  getDuration(budget: Budget) {
    if (budget.duration === 'annual') {
      return 'year';
    } else if (budget.duration === 'weekly') {
      return 'week';
    } else if (budget.duration === 'monthly') {
      return 'month';
    } else {
      return '';
    }
  }

  newExpense(budget: Budget) {
    this.router.navigate(['/expense/new'], { queryParams: { data: JSON.stringify(budget) } });
  }

}
