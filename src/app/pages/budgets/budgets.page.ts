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

  constructor(
    private budgetService    : BudgetService,
    private categoriesService: CategoryService,
    private router           : Router,
    private modalCtrl        : ModalController
  ) {

  }

  async ngOnInit() {

  }

  async openBudgetModal(budget?: Budget) {
    const modal = await this.modalCtrl.create({
      component: BudgetComponent
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data.id);
    console.log(data.budget);

    this.budgetService.setBudget(data.id, data.budget);
  }

}
