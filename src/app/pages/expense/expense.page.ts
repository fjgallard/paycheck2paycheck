import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Category } from '@services/storage/category.service';
import { Expense, ExpenseService } from '@services/storage/expense.service';
import { ExpenseCategoriesComponent } from './expense-categories/expense-categories.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.page.html',
  styleUrls: ['./expense.page.scss'],
})
export class ExpensePage implements OnInit {

  expenseIcon: string;

  id         : string;
  expense    : Expense;
  expenseForm: FormGroup

  constructor(
    private expenseService: ExpenseService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {
    this.expense = { id: '', value: 0, createdAt: new Date() }
    this.expenseIcon = 'wallet';
    this.expenseForm = this.fb.group({
      value    : [ '' , Validators.required ],
      createdAt: [ '', Validators.required ],
      category : [ '' ]
    });

  }

  async ngOnInit() {
    console.log(await this.expenseService.getExpenses());
  }

  async openCategoriesModal() {
    const modal = await this.modalController.create({
      component: ExpenseCategoriesComponent,
      cssClass: 'my-custom-class'
    });

    await modal.present();
    const result = await modal.onWillDismiss();
    const category = result.data.selectedCategory as Category;

    this.expense.category = category.id;
    this.expenseForm.get('category').setValue(category.name)
  }

  onSubmit() {
    const expense = {
      value: this.expenseForm.get('value').value,
      createdAt: this.expenseForm.get('createdAt').value,
      category: this.expense.category
    }

    console.log(expense);
    // this.expenseService.setExpense(expense);
  }

  get category() {
    return 'Uncategorized';
  }

}
