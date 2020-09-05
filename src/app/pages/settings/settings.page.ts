import { Component, OnInit } from '@angular/core';
import { IncomeService }     from '@services/storage/income.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  monthlyIncome: number;
  customIncome: number;

  constructor(private incomeService: IncomeService) { }

  async ngOnInit() {
    this.monthlyIncome = await this.incomeService.getDefaultMonthIncome();
    this.customIncome = await this.incomeService.getCurrentMonthIncome();
  }

  async updateCustomIncome() {
    if (this.customIncome) {
      await this.incomeService.setCurrentMonthIncome(this.customIncome);
    }
  }

  async updateMonthlyIncome() {
    if (this.monthlyIncome) {
      await this.incomeService.setDefaultMonthIncome(this.monthlyIncome);
    }

  }

}
