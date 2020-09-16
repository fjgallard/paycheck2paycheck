import { Component, Input, OnInit } from '@angular/core';

import { Category } from '@services/storage/category.service';

@Component({
  selector: 'budgets-budget-category',
  templateUrl: './budget-category.component.html',
  styleUrls: ['./budget-category.component.scss'],
})
export class BudgetCategoryComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit() {}

  get percentage() {
    const value = this.category.value || 0;

    if (this.category.limit) {
      return value / this.category.limit;
    } else {
      return 1;
    }
  }

}
