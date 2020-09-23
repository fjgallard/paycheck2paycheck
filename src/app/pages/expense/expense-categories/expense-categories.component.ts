import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '@services/storage/category.service';

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.scss'],
})
export class ExpenseCategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) { }

  async ngOnInit() {
    const categoriesObj = await this.categoryService.getCategories();
    const keys = Object.keys(categoriesObj);
    keys.forEach(key => {
      this.categories.push(categoriesObj[key])
    });
  }

}
