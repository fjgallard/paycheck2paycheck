import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BudgetComponent } from './budget/budget.component';

import {
  moveItemInArray,
  CdkDragDrop,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { Budget } from '@models/budget';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BudgetService } from '@services/storage/budget/budget.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.page.html',
  styleUrls: ['./budgets.page.scss'],
})
export class BudgetsPage implements OnInit {
  monthlyBudgets$: Observable<Budget[]>;
  annualBudgets$: Observable<Budget[]>;

  constructor(
    private budgetService: BudgetService,
    private modalCtrl: ModalController
  ) {
    this.monthlyBudgets$ = this.budgetService.monthlyBudgets$.pipe(
      map(budgets => {
        if (budgets) {
          return budgets.map(budget => ({ ...budget, cssClass: this.budgetService.getCssClass(budget), consumed: this.getConsumed(budget) }))
        }
      })
    );

    this.annualBudgets$ = this.budgetService.annualBudgets$.pipe(
      map(budgets => {
        if (budgets) {
          return budgets.map(budget => (
            { 
              ...budget,
              cssClass: this.budgetService.getCssClass(budget),
              consumed: this.getConsumed(budget)
            }
          ))
        }
      })
    );
  }

  async ngOnInit() {
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

    if (data?.budget && budget) {
      await this.budgetService.updateBudget(budget.id, data.budget);
    } else if (data.budget) {
      await this.budgetService.createBudget(data.budget);
    }
  }

  async deleteBudget(id: string) {
    console.log(id);
    await this.budgetService.deleteBudget(id);
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


  private getConsumed(budget: Budget) {
    return 0;
  }

}
