import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Expense, ExpenseService } from '@services/storage/expense.service';

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
    private modal: ModalController
  ) {
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

  openCategoriesModal() {
  }

  onSubmit() {
    const expense = {
      value: this.expenseForm.get('value').value,
      createdAt: this.expenseForm.get('createdAt').value,
      category: this.expenseForm.get('category').value,
    }
    this.expenseService.setExpense(expense);
  }

  get category() {
    return 'Uncategorized';
  }

}
