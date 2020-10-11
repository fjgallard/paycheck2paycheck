import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Budget, BudgetService } from '@services/storage/budget.service';
import { IonInput, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Category, CategoryService } from '@services/storage/category.service';
import { BudgetComponent } from './budget/budget.component';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  budgets = [];

  constructor(
    private budgetService    : BudgetService,
    private router           : Router,
    private modalCtrl        : ModalController
  ) {
    this.budgets = [];
  }

  async ngOnInit() {
    this.reloadBudgets();
  }

  async openBudgetModal(budget?: Budget) {
    const modal = await this.modalCtrl.create({
      component: BudgetComponent
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.id && data?.budget) {
      await this.budgetService.setBudget(data.id, data.budget);
      this.reloadBudgets();
    }
  }

  private async reloadBudgets() {
    this.budgets = [];
    const budgetsObj = await this.budgetService.getBudgets();
    if (budgetsObj) {
      const budgetKeys = Object.keys(budgetsObj);

      budgetKeys.forEach(key => {
        this.budgets.push({ id: key, ...budgetsObj[key] });
      })
    }
  }

}
