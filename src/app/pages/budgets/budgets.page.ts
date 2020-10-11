import { Component, OnInit } from '@angular/core';
import { Budget, BudgetService } from '@services/storage/budget.service';
import { ModalController } from '@ionic/angular';
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
    private modalCtrl        : ModalController
  ) {
    this.budgets = [];
  }

  async ngOnInit() {
    this.reloadBudgets();
  }

  async openBudgetModal(budget?: Budget) {
    const modal = await this.modalCtrl.create({
      component: BudgetComponent,
      componentProps: {
        ...budget
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data?.id && data?.budget) {
      await this.budgetService.setBudget(data.id, data.budget);
      this.reloadBudgets();
    }
  }

  async deleteBudget(id: string) {
    await this.budgetService.deleteBudget(id);
    this.reloadBudgets();
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
