import { Component, OnInit } from '@angular/core';
import { Storage }           from '@ionic/storage';
import { IncomeService }     from '@services/storage/income.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  monthlyIncome: number;

  constructor(private incomeService: IncomeService) { }

  async ngOnInit() {
    this.monthlyIncome = await this.incomeService.getCurrentMonthIncome();

    if (!this.monthlyIncome) {
      this.monthlyIncome = await this.incomeService.getDefaultMonthIncome();
      this.incomeService.setCurrentMonthIncome(this.monthlyIncome);
    }
  }

}
