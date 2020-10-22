import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { Budget } from '@models/budget';
import { Expense } from '@models/expense';
import { BudgetService } from '@services/storage/budget/budget.service';
import { ExpensesService } from '@services/storage/expenses/expenses.service';

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
  budget     : Budget;

  constructor(
    public budgetService: BudgetService,
    private expensesService: ExpensesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.expense = { id: '', budgetId: '', value: 0, createdAt: new Date() }
    this.expenseIcon = 'wallet';
    this.expenseForm = this.fb.group({
      value    : [ '' , Validators.required ],
      createdAt: [ this.expense.createdAt.toISOString(), Validators.required ],
      category : [ '' ],
      name: ['']
    });

    this.route.queryParams.subscribe(params =>{
      this.budget = JSON.parse(params.data);
      console.log(this.budget);
    });
  }

  async ngOnInit() {
  }


  async onSubmit() {
    const createdAt = new Date(this.expenseForm.get('createdAt').value);
    const expense: Expense = {
      id: this.expenseForm.get('name').value,
      value: this.expenseForm.get('value').value,
      budgetId: this.budget.id,
      createdAt
    }

    await this.expensesService.createExpense(expense);
    this.router.navigateByUrl('/dashboard');
  }

  onCancel() {
    this.router.navigateByUrl('/dashboard');
  }


  get budgetLeft() {
    return this.budget.limit;
  }

}
