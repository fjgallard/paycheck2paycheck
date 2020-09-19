import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Expense } from '@services/storage/expense.service';

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
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.expenseIcon = 'wallet';
    this.expenseForm = this.fb.group({
      value    : [ , Validators.required ],
      createdAt: [ '', Validators.required ],
      category : [ '' ]
    });
  }

  ngOnInit() {
  }

  get category() {
    return 'Uncategorized';
  }

}
