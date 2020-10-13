import { Component, OnInit } from '@angular/core';
import { BudgetService } from '@services/storage/budget.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  monthlyBudget: number;
  customBudget: number;

  constructor(
    private budgetService: BudgetService
  ) { }

  async ngOnInit() {
  }
}
