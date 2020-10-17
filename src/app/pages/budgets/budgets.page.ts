import { Component, OnInit } from '@angular/core';
import { Budget, BudgetService } from '@services/storage/budget.service';
import { ModalController } from '@ionic/angular';
import { BudgetComponent } from './budget/budget.component';

import {
  moveItemInArray,
  CdkDragDrop,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {

  budgets = [];
  monthylBudgets = [];
  weeklyBudgets = [];
  annualBudgets = [];

  constructor(
    private budgetService    : BudgetService,
    private modalCtrl        : ModalController
  ) {
  }

  async ngOnInit() {
    await this.reloadBudgets();
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

  // Drag n Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  private async reloadBudgets() {
    await this.budgetService.reloadBudgets();
    this.monthylBudgets = [];
    this.annualBudgets = [];

    this.budgetService.yearlyBudgets.forEach(budget => {
      this.annualBudgets.push({
        id: budget.id,
        cssClass: this.getCssClass(budget),
        percentage: this.getPercentage(budget),
        ...budget
      });
    });

    this.budgetService.monthlyBudgets.forEach(budget => {
      this.monthylBudgets.push({
        id: budget.id,
        cssClass: this.getCssClass(budget),
        percentage: this.getPercentage(budget),
        ...budget
      });
    })
  }

  private getCssClass(budget: Budget) {
    const percentage = this.getPercentage(budget);
    if (percentage <= 0.5) {
      return 'success';
    } else if (percentage <= 0.8) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  private getPercentage(budget: Budget) {
    if (!budget.limit) {
      return 0;
    }

    return budget.consumed / budget.limit;
  }

}
