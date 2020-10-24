import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { Location } from '@angular/common';
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
    private _location: Location,
    public budgetService: BudgetService,
    private expensesService: ExpensesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.expense = { id: '', name: '', budgetId: '', value: 0, createdAt: new Date() }
    this.expenseIcon = 'wallet';
    this.expenseForm = this.fb.group({
      value    : [ '' , Validators.required ],
      createdAt: [ this.expense.createdAt.toISOString(), Validators.required ],
      name: ['']
    });

    this.route.queryParams.subscribe(params =>{
      if (params?.budget) {
        this.budget = JSON.parse(params.budget);
      }
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.expense = await this.expensesService.getExpense(id);
      this.expenseForm.get('value').setValue(this.expense.value);
      this.expenseForm.get('createdAt').setValue(this.expense.createdAt.toISOString());
      this.expenseForm.get('name').setValue(this.expense.name);
      if (this.expense) {
        this.budget = await this.budgetService.getBudget(this.expense.budgetId);
      }
    }
  }


  async onSubmit() {
    const expense: Expense = {
      id: '',
      name: this.expenseForm.get('name').value,
      value: this.expenseForm.get('value').value,
      budgetId: this.budget.id,
      createdAt: new Date(this.expenseForm.get('createdAt').value)
    }

    if(this.expense.id) {
      expense.id = this.expense.id;
      await this.expensesService.updateExpense(expense.id, expense);
      this.router.navigate([`expenses/${this.budget.id}`]);
    } else {
      await this.expensesService.createExpense(expense);
      this.router.navigateByUrl('/dashboard');
    }
    
  }

  onCancel() {
    // this.router.navigateByUrl('/dashboard');
    this._location.back();
  }


  get budgetLeft() {
    return this.budget.limit;
  }

}
